import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// COMPONENTS
import InvoiceTable from "../../../../components/dashboardBilling/InvoiceTable/InvoiceTable";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import ClientTransactions from "../../../../components/dashboardBilling/TransactionTable/TransactionTable";

// GRAPHQL
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";
import { GET_CLIENT } from "../../../../graphql/queries/clientQueries";
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import TotalBilledCard from "../../../../components/dashboardBilling/TotalBilledCard/TotalBilledCard";
import BilledThisMonth from "../../../../components/dashboardBilling/BilledThisMonth/BilledThisMonth";
import BudgetRemaining from "../../../../components/dashboardBilling/BudgetRemaining/BudgetRemaining";

const ClientBilling = () => {
  const { clientId } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
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

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  if (invoicesLoading || transactionsLoading || projectsLoading)
    return <Spinner />;
  if (invoicesError || transactionsError || projectsError)
    return <p>There was a problem loading the client transactions...</p>;

  // const invoicesArray = invoicesData.invoices;
  const transactionsArray = transactionsData.transactions;

  const matchingProjects = projectsData.projects.filter(
    (project) => project.client.id === clientId
  );

  const budgetsTotalSum = matchingProjects.reduce(function (acc, obj) {
    return acc + parseFloat(obj.clientBudget);
  }, 0);

  // const matchingInvoices = invoicesArray.filter(
  //   (invoice) => invoice.client.id === clientId
  // );

  // const invoicesTotalSum = matchingInvoices.reduce(function (acc, obj) {
  //   return acc + parseFloat(obj.amount);
  // }, 0);

  const matchingTransactions = transactionsArray.filter(
    (transaction) => transaction.client.id === clientId
  );

  // const budgetRemaining = budgetsTotalSum - invoicesTotalSum;
  const billedThisMonth = 50;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row">
        {/* <TotalBilledCard totalBilled={invoicesTotalSum} /> */}

        <BilledThisMonth billedThisMonth={billedThisMonth} />

        {/* <BudgetRemaining budgetRemaining={budgetRemaining} /> */}
      </div>
      <div className="w-full flex flex-row">
        {/* <InvoiceTable invoices={matchingInvoices} /> */}
        <ClientTransactions transactions={matchingTransactions} />
      </div>
    </div>
  );
};

export default ClientBilling;
