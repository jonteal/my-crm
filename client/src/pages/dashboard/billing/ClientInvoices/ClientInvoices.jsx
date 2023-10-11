import InvoiceTable from "../../../../components/InvoiceTable/InvoiceTable";
// GRAPHQL
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";

export const ClientInvoices = () => {
  const { clientId } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES);

  if (transactionsLoading) return <Spinner />;
  if (transactionsError)
    return <p>There was a problem loading the client transactions...</p>;

  const matchingInvoices = invoicesData.invoices.filter(
    (invoice) => invoice.client.id === clientId
  );
  return <InvoiceTable invoices={matchingInvoices} />;
};
