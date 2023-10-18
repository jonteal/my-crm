import { useState } from "react";
import { useParams } from "react-router-dom";

// LIBRARIES
import { useMutation, useQuery } from "@apollo/client";

// GRAPHQL
import { ADD_INVOICE } from "../../../../graphql/mutations/invoiceMutations";
import { GET_ALL_CLIENT_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_CLIENT_PROJECTS } from "../../../../graphql/queries/projectQueries";

// COMPONENTS
import { DynamicButton } from "../../../../components/reusable/buttons/DynamicButton/DynamicButton";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";

// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

export const AddInvoice = () => {
  const { clientId } = useParams();

  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [projectId, setProjectId] = useState("");
  // const [isProjectInvoice, setIsProjectInvoice] = useState(false);

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_CLIENT_PROJECTS, { variables: { clientId } });

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
      const { clientInvoices } = cache.readQuery({
        query: GET_ALL_CLIENT_INVOICES,
        variables: { clientId },
      });
      cache.writeQuery({
        query: GET_ALL_CLIENT_INVOICES,
        variables: { clientId },
        data: { clientInvoices: [...clientInvoices, addInvoice] },
      });
    },
  });

  const handleDateChange = (date) => {
    setDate(date);
  };

  if (projectsLoading) return <Spinner />;
  if (projectsError) return <p>There was an error loading the content</p>;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      date === "" ||
      amount === "" ||
      invoiceNumber === "" ||
      projectId === ""
    ) {
      alert("Please fill in all fields");
    }

    addInvoice(date, amount, notes, invoiceNumber, projectId, clientId);

    setDate(new Date());
    setAmount("");
    setNotes("");
    setInvoiceNumber("");
    setProjectId("");
  };

  return (
    <div className="bg-slate-50 flex flex-col items-center rounded-xl mx-2 mt-2">
      <h3 className="font-semibold text-lg mt-2">Add Invoice</h3>
      <div className="flex flex-row justify-between my-3 w-full px-4">
        {/* <div className="flex flex-row items-center w-full mr-2 mb-5">
          <input
            id="default-checkbox"
            type="checkbox"
            value={isProjectInvoice}
            onChange={() => setIsProjectInvoice(!isProjectInvoice)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Is this an invoice for a project?
          </label>
        </div> */}

        {/* {isProjectInvoice === true && ( */}
        <div className="flex flex-col w-full ml-2">
          <label className="form-label block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Project Name
          </label>
          <select
            className="form-select"
            aria-label="Select Project"
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projectsData.clientProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        {/* )} */}
      </div>

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
        <div className="flex flex-wrap mx-3 mb-6">
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

        <DynamicButton type="submit">Submit</DynamicButton>
      </form>
    </div>
  );
};
