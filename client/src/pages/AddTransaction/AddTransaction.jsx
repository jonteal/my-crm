import { useState } from "react";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_TRANSACTION } from "../../graphql/mutations/transactionMutations";
import { GET_TRANSACTIONS } from "../../graphql/queries/transactionQueries";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";

// COMPONENTS
import SubmitButton from "../../components/buttons/submitButton/SubmitButton";
import Spinner from "../../components/Spinner/Spinner";

// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

// import "./addClient.css";

const rootClass = "add-transaction";

const AddTransaction = () => {
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentParty, setPaymentParty] = useState("");
  const [clientId, setClientId] = useState("");
  const [incomingOutgoing, setIncomingOutgoing] = useState("outgoing");

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    variables: {
      paymentDate,
      amount,
      paymentParty,
      clientId,
      incomingOutgoing,
    },
    update(cache, { data: { addTransaction } }) {
      const { transactions } = cache.readQuery({ query: GET_TRANSACTIONS });
      cache.writeQuery({
        query: GET_TRANSACTIONS,
        data: { transactions: [...transactions, addTransaction] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleDateChange = (date) => {
    setPaymentDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (paymentDate === "" || amount === "" || paymentParty === "") {
      alert("Please fill in all fields");
    }

    addTransaction(
      paymentDate,
      amount,
      paymentParty,
      clientId,
      incomingOutgoing
    );

    setPaymentDate(new Date());
    setAmount("");
    setPaymentParty("");
    setClientId("");
    setIncomingOutgoing("outgoing");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <div className={`${rootClass}-container`}>
      <h3 className={`${rootClass}-title`}>Add Transaction</h3>

      <label className="form-label client-select">Client Name</label>
      <select
        className="form-select"
        aria-label="Client select"
        id="clientId"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      >
        <option value="">Select Client</option>
        {data.clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.firstName + " " + client.lastName}
          </option>
        ))}
      </select>

      <form className="w-full max-w-lg" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="mb-3">
              <label className="form-label block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date
              </label>
              <DatePicker
                className="border py-2 px-2 rounded"
                selected={paymentDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-payment-party"
            >
              Payment Party
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payment-party"
              aria-label="Payment party input"
              type="text"
              placeholder="ex. Squarespace"
              value={paymentParty}
              onChange={(e) => setPaymentParty(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-transaction-amount"
            >
              Amount
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-transaction-amount"
              type="text"
              placeholder="ex. $500"
              aria-label="Transaction Amount input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            aria-label="Transaction type select"
            value={incomingOutgoing}
            onChange={(e) => setIncomingOutgoing(e.target.value)}
          >
            <option aria-label="Incoming" value="incoming">
              Incoming
            </option>
            <option aria-label="Outgoing" value="outgoing">
              Outgoing
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <SubmitButton className="mb-3" type="submit">
          Submit
        </SubmitButton>
      </form>
    </div>
  );
};

export default AddTransaction;
