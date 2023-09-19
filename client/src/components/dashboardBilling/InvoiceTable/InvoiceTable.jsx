import { Link, useParams } from "react-router-dom";
import AddButton from "../../reusable/buttons/AddButton/AddButton";
import InvoiceTableItem from "../InvoiceTableItem/InvoiceTableItem";

const InvoiceTable = ({ invoices, shortList }) => {
  const { clientId, projectId } = useParams();
  const filteredList = shortList ? invoices : invoices.slice(0, 5);
  return (
    <div className="bg-slate-50 w-full rounded-xl mx-2 py-2">
      <div className="flex flex-row justify-between py-2 px-2">
        <h2 className="text-left text-slate-700 text-lg mx-2">Invoices</h2>
        <Link to="addInvoice">
          <AddButton className="mx-2">Add Invoice</AddButton>
        </Link>
      </div>

      {filteredList.map((invoice) => (
        <Link
          to={`/clients/${clientId}/projects/${projectId}/financials/invoices/${invoice.id}`}
        >
          <InvoiceTableItem key={invoice.id} invoice={invoice} />
        </Link>
      ))}
    </div>
  );
};

export default InvoiceTable;
