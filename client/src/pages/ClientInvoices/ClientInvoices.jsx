import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
// GRAPHQL
import { GET_INVOICES } from "../../graphql/queries/invoiceQueries";
import { GET_TRANSACTIONS } from "../../graphql/queries/transactionQueries";
import { GET_CLIENT } from "../../graphql/queries/clientQueries";

const ClientInvoices = () => {
  const { id } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES);

  if (transactionsLoading) return <Spinner />;
  if (transactionsError)
    return <p>There was a problem loading the client transactions...</p>;

  const invoicesArray = invoicesData.invoices;

  const matchingInvoices = invoicesArray.filter(
    (invoice) => invoice.client.id === clientId
  );
  return <InvoiceTable invoices={matchingInvoice} />;
};

export default ClientInvoices;
