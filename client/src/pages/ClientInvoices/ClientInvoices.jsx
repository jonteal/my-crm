import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";

import { fakeInvoices } from "../ClientBilling/ClientBilling";

const ClientInvoices = () => {
  return <InvoiceTable invoices={fakeInvoices} />;
};

export default ClientInvoices;
