import { Link, useParams } from "react-router-dom";
import InvoiceTableItem from "../../components/InvoiceTableItem/InvoiceTableItem";
import EditButton from "../../components/buttons/EditButton/EditButton";

const fakeInvoices = [
  {
    id: 1,
    date: "March, 01, 2020",
    invoiceNumber: "#MS-415646",
    amount: "$180",
  },
  {
    id: 2,
    date: "March, 05, 2021",
    invoiceNumber: "#MS-415647",
    amount: "$250",
  },
  {
    id: 3,
    date: "September, 01, 2021",
    invoiceNumber: "#MS-415648",
    amount: "$170",
  },
  {
    id: 4,
    date: "February, 09, 2022",
    invoiceNumber: "#MS-415649",
    amount: "$200",
  },
];

const ClientBilling = () => {
  const { id } = useParams();

  return (
    <div className="w-full">
      <div className="bg-slate-50 w-1/2 rounded-xl mx-2 py-2">
        <div className="flex flex-row justify-between py-2 px-2">
          <h2 className="text-left text-slate-700 text-lg mx-2">Invoices</h2>
          <Link to={`invoices`}>
            <EditButton className="mx-2">View All</EditButton>
          </Link>
        </div>
        {fakeInvoices.map((invoice) => (
          <InvoiceTableItem key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
};

export default ClientBilling;
