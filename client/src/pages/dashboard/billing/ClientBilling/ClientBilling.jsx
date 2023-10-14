import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// COMPONENTS
import InvoiceTable from "../../../../components/InvoiceTable/InvoiceTable";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import { TransactionTable } from "../../../../components/TransactionTable/TransactionTable";

// GRAPHQL
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";
import BilledThisMonth from "../../../../components/dashboardBilling/BilledThisMonth/BilledThisMonth";
// import TotalBilledCard from "../../../../components/dashboardBilling/TotalBilledCard/TotalBilledCard";
// import BudgetRemaining from "../../../../components/dashboardBilling/BudgetRemaining/BudgetRemaining";

export const ClientBilling = () => {
  const { clientId } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES, { variables: { clientId } });

  console.log("invoicesData", invoicesData);

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_TRANSACTIONS, { variables: { clientId } });

  if (invoicesLoading || transactionsLoading) return <Spinner />;
  if (invoicesError || transactionsError)
    return <p>There was a problem loading the client transactions...</p>;

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
        <InvoiceTable invoices={invoicesData.invoices} />
        <TransactionTable transactions={transactionsData.transactions} />
      </div>
    </div>
  );
};
