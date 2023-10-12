import { useState } from "react";
import { useParams } from "react-router-dom";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_INVOICE } from "../../../../graphql/mutations/invoiceMutations";
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

const rootClass = "add-invoice";

export const AddInvoice = () => {
  const { clientId, projectId } = useParams();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [addInvoice] = useMutation(ADD_INVOICE, {
    variables: {
      date,
      amount,
      notes,
      invoiceNumber,
      clientId,
      projectId,
    },
    update(cache, { data: { addInvoice } }) {
      const { invoices } = cache.readQuery({
        query: GET_INVOICES,
        variables: { projectId },
      });
      cache.writeQuery({
        query: GET_INVOICES,
        variables: { projectId },
        data: { invoices: [...invoices, addInvoice] },
      });
    },
  });

  const {
    loading: clientsLoading,
    error: clientsError,
    data: clientsData,
  } = useQuery(GET_CLIENT, { variables: { id: clientId } });

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECT, { variables: { id: projectId } });

  const handleDateChange = (date) => {
    setDate(date);
  };

  if (clientsLoading || projectsLoading) return <Spinner />;
  if (clientsError || projectsError)
    return <p>There was an error loading the content</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (date === "" || amount === "" || invoiceNumber === "") {
      alert("Please fill in all fields");
    }

    addInvoice(date, amount, notes, invoiceNumber, projectId, clientId);

    setDate(new Date());
    setAmount("");
    setNotes("");
    setInvoiceNumber("");
    // setProject(projectId);
  };

  return (
    <div
      className={`${rootClass}-container bg-slate-50 flex flex-col items-center rounded-xl mx-2 mt-2`}
    >
      <h3 className={`${rootClass}-title font-semibold text-lg mt-2`}>
        Add Invoice
      </h3>

      {/* <h1 className="text-slate-700 text-xl">
        Project: {matchingProjects[0].title}
      </h1> */}

      {/* <label className="form-label client-select">Project Name</label>
      <select
        className="form-select"
        aria-label="Default select example"
        id="projectId"
        value={projectId}
        onChange={(e) => setProject(e.target.value)}
      >
        <option value="">Select Client</option>
        {projectsData.projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select> */}

      <form className="w-full max-w-lg mb-3" onSubmit={onSubmit}>
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
            <div className="flex flex-row items-center">
              <span className="mx-2 text-lg">$</span>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-invoice-amount"
                min="0.01"
                step="0.01"
                type="number"
                placeholder="ex. 500"
                aria-label="Invoice Amount input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-notes"
            >
              Notes
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-notes"
              aria-label="Invoice notes section"
              //   type="text"
              rows="3"
              placeholder="Notes about this invoice"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
