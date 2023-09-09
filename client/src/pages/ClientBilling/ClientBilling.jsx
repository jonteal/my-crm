import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// COMPONENTS
import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
import Spinner from "../../components/Spinner/Spinner";
import ClientTransactions from "../../components/ClientTransactions/ClientTransactions";

// GRAPHQL
import { GET_INVOICES } from "../../graphql/queries/invoiceQueries";
import { GET_TRANSACTIONS } from "../../graphql/queries/transactionQueries";
import { GET_CLIENT } from "../../graphql/queries/clientQueries";

const ClientBilling = () => {
  const { id } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id },
  });

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES);

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_TRANSACTIONS);

  if (invoicesLoading || transactionsLoading) return <Spinner />;
  if (invoicesError || transactionsError)
    return <p>There was a problem loading the client transactions...</p>;

  const invoicesArray = invoicesData.invoices;
  const transactionsArray = transactionsData.transactions;

  const client = clientData.client;

  const clientId = clientData.client.id;

  const matchingInvoices = invoicesArray.filter(
    (invoice) => invoice.client.id === clientId
  );

  const matchingTransactions = transactionsArray.filter(
    (transaction) => transaction.client.id === clientId
  );

  return (
    <div className="w-full flex flex-row">
      <InvoiceTable invoices={matchingInvoices} />
      <ClientTransactions transactions={matchingTransactions} />
    </div>
  );
};

export default ClientBilling;
