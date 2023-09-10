import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// COMPONENTS
import InvoiceTable from "../../../../components/dashboardBilling/InvoiceTable/InvoiceTable";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import ClientTransactions from "../../../../components/dashboardBilling/ClientTransactions/ClientTransactions";

// GRAPHQL
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";
import TotalBilledCard from "../../../../components/dashboardBilling/TotalBilledCard/TotalBilledCard";

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

  console.log("matchingInvoices: ", matchingInvoices);

  const invoicesTotalSum = matchingInvoices.reduce(function (acc, obj) {
    return acc + parseFloat(obj.amount);
  }, 0);
  console.log(invoicesTotalSum);

  const matchingTransactions = transactionsArray.filter(
    (transaction) => transaction.client.id === clientId
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row">
        <div className="w-1/3">
          <TotalBilledCard totalBilled={invoicesTotalSum} />
        </div>
      </div>
      <div className="w-full flex flex-row">
        <InvoiceTable invoices={matchingInvoices} />
        <ClientTransactions transactions={matchingTransactions} />
      </div>
    </div>
  );
};

export default ClientBilling;
