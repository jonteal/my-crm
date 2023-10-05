import { useState } from "react";
import { useParams } from "react-router-dom";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_TRANSACTION } from "../../../../graphql/mutations/transactionMutations";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

const rootClass = "add-transaction";

export const AddTransaction = () => {
  const { clientId, projectId } = useParams();

  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentParty, setPaymentParty] = useState("");
  const [incomingOutgoing, setIncomingOutgoing] = useState("outgoing");

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    variables: {
      paymentDate,
      amount,
      paymentParty,
      clientId,
      projectId,
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

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, { variables: { id: clientId } });

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, { variables: { id: projectId } });

  const handleDateChange = (date) => {
    setPaymentDate(date);
  };

  if (clientLoading || projectLoading) return <Spinner />;
  if (clientError || projectError)
    return <p>There was an error loading the content</p>;

  const client = clientData.client;
  const project = projectData.project;

  const onSubmit = (e) => {
    e.preventDefault();

    if (paymentDate === "" || amount === "" || paymentParty === "") {
      alert("Please fill in all fields");
    }

    addTransaction(
      paymentDate,
      amount,
      paymentParty,
      incomingOutgoing,
      clientId,
      projectId
    );

    setPaymentDate(new Date());
    setAmount("");
    setPaymentParty("");
    setIncomingOutgoing("outgoing");
  };

  return (
    <div className={`${rootClass}-container bg-slate-50 rounded-xl mx-2 w-1/2`}>
      <h3 className={`${rootClass}-title pt-3 mt-2`}>Add Transaction</h3>

      <h1 className="text-slate-700 my-2 text-base">
        Client: {client.firstName + " " + client.lastName}
      </h1>
      <h2 className="text-slate-700 text-sm mb-4 mt-1">
        Project: {project.title}
      </h2>

      <form className="w-full max-w-lg pb-3" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
            <div className="mb-3">
              <label className="form-label block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date
              </label>
              <DatePicker
                className="border py-2 px-2 rounded w-full"
                selected={paymentDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="w-5/12 px-2 mx-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-payment-party"
            >
              Payment Party
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payment-party"
              aria-label="Payment party input"
              type="text"
              placeholder="ex. Squarespace"
              value={paymentParty}
              onChange={(e) => setPaymentParty(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full px-2 mb-6 flex flex-row">
          <div className="flex flex-col w-1/2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-transaction-amount"
            >
              Amount
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-transaction-amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="ex. 500"
              aria-label="Transaction Amount input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-1/2 mx-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-transaction-type"
            >
              Type
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 mx-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-transaction-type"
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
        </div>

        <SubmitButton className="mb-3" type="submit">
          Submit
        </SubmitButton>
      </form>
    </div>
  );
};
