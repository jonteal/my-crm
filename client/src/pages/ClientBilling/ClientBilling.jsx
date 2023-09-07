import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";

export const fakeInvoices = [
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
  return (
    <div className="w-full">
      <InvoiceTable invoices={fakeInvoices} />
    </div>
  );
};

export default ClientBilling;
