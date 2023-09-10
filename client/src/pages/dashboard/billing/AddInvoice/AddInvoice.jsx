import { useState } from "react";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_INVOICE } from "../../../../graphql/mutations/invoiceMutations";
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_CLIENTS } from "../../../../graphql/queries/clientQueries";

// COMPONENTS
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

// import "./addClient.css";

const rootClass = "add-invoice";

const AddInvoice = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientId, setClientId] = useState("");

  const [addInvoice] = useMutation(ADD_INVOICE, {
    variables: {
      date,
      amount,
      invoiceNumber,
      clientId,
    },
    update(cache, { data: { addInvoice } }) {
      const { invoices } = cache.readQuery({ query: GET_INVOICES });
      cache.writeQuery({
        query: GET_INVOICES,
        data: { invoices: [...invoices, addInvoice] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (date === "" || amount === "" || invoiceNumber === "") {
      alert("Please fill in all fields");
    }

    addInvoice(date, amount, invoiceNumber, clientId);

    setDate(new Date());
    setAmount("");
    setInvoiceNumber("");
    setClientId("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the content</p>;

  return (
    <div className={`${rootClass}-container`}>
      <h3 className={`${rootClass}-title`}>Add Client</h3>

      <label className="form-label client-select">Client Name</label>
      <select
        className="form-select"
        aria-label="Default select example"
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
                selected={date}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-invoice-number"
            >
              Invoice Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-invoice-number"
              aria-label="Invoice Number input"
              type="text"
              placeholder="ex. M12345"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-invoice-amount"
            >
              Amount
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-invoice-amount"
              type="text"
              placeholder="ex. $500"
              aria-label="Invoice Amount input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <SubmitButton className="mb-3" type="submit">
          Submit
        </SubmitButton>
      </form>
    </div>
  );
};

export default AddInvoice;
