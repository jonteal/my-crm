import { Link } from "react-router-dom";
import EditButton from "../../reusable/buttons/EditButton/EditButton";
import AddButton from "../../reusable/buttons/AddButton/AddButton";
import InvoiceTableItem from "../InvoiceTableItem/InvoiceTableItem";

const InvoiceTable = ({ invoices }) => {
  return (
    <div className="bg-slate-50 w-1/2 rounded-xl mx-2 py-2">
      <div className="flex flex-row justify-between py-2 px-2">
        <h2 className="text-left text-slate-700 text-lg mx-2">Invoices</h2>
        <Link to="addInvoice">
          <AddButton className="mx-2">Add Invoice</AddButton>
        </Link>
        <Link to="invoices">
          <EditButton className="mx-2">View All</EditButton>
        </Link>
      </div>
      {invoices.map((invoice) => (
        <InvoiceTableItem key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
};

export default InvoiceTable;
