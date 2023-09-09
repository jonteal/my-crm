import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";

import { fakeTransactions } from "../ClientBilling/ClientBilling";

const ClientInvoices = () => {
  return <InvoiceTable invoices={fakeTransactions} />;
};

export default ClientInvoices;
