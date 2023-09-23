import { Link, useParams } from "react-router-dom";
import { TbFileInvoice } from "react-icons/tb";
import AddButton from "../reusable/buttons/AddButton/AddButton";
import InvoiceTableItem from "../dashboardBilling/InvoiceTableItem/InvoiceTableItem";

const InvoiceTable = ({ invoices, shortList }) => {
  const { clientId, projectId } = useParams();
  const filteredList = shortList ? invoices : invoices.slice(0, 5);
  return (
    <div className="bg-slate-50 w-full rounded-xl mx-2 py-2">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-row items-center mx-1">
          <TbFileInvoice className="ml-2 text-lg" />
          <h2 className="text-left text-slate-700 text-lg mx-2">Invoices</h2>
        </div>
        {projectId && (
          <div className="flex flex-row justify-between py-2 px-2">
            <Link
              to={`/clients/${clientId}/projects/${projectId}/financials/addInvoice`}
            >
              <AddButton className="mx-2">Add Invoice</AddButton>
            </Link>
          </div>
        )}
      </div>

      {filteredList.length === 0 ? (
        <div className="flex flex-row items-center justify-center px-5">
          <h2 className="mt-5 text-lg italic pb-4">
            {`You do not have any invoices for this ${
              projectId ? "project" : "client"
            } yet. To add an invoice, select a project and add invoice in Financials section`}
          </h2>
        </div>
      ) : (
        filteredList.map((invoice) => (
          <Link
            key={invoice.id}
            to={`/clients/${clientId}/projects/${projectId}/financials/invoices/${invoice.id}`}
          >
            <InvoiceTableItem key={invoice.id} invoice={invoice} />
          </Link>
        ))
      )}
    </div>
  );
};

export default InvoiceTable;