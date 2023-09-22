import InvoiceTable from "../../../../components/dashboardBilling/InvoiceTable/InvoiceTable";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import TransactionTable from "../../../../components/TransactionTable/TransactionTable";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";
import EditButton from "../../../../components/reusable/buttons/EditButton/EditButton";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";

const ProjectFinancials = () => {
  const { projectId } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, { variables: { id: projectId } });

  console.log("projectData: ", projectData);

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES, { variables: { id: projectId } });

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_TRANSACTIONS, { variables: { id: projectId } });

  if (invoicesLoading || transactionsLoading || projectLoading)
    return <Spinner />;
  if (invoicesError || transactionsError || projectError)
    return <p>There was a problem loading the client invoices...</p>;

  const matchingInvoices = invoicesData.invoices.filter(
    (invoice) => invoice.project.id === projectId
  );

  const matchingTransactions = transactionsData.transactions.filter(
    (transaction) => transaction.project.id === projectId
  );

  const invoiceSum = matchingInvoices.reduce(function (acc, obj) {
    return acc + parseFloat(obj.amount);
  }, 0);

  console.log("invoiceSum: ", invoiceSum);

  const budgetUsed = (invoiceSum / projectData.project.clientBudget) * 100;

  console.log("budgetUsed: ", budgetUsed);

  return (
    <div className="mt-2">
      <div className="flex flex-col w-full">
        <div className="w-full mx-2 my-3">
          <h2 className="text-left my-2">Budget Used</h2>
          <ProgressBar now={budgetUsed} />
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-full items-start mr-2">
            <Link to="invoices" className="mx-2 my-2">
              <EditButton className="mx-2">View All Invoices</EditButton>
            </Link>

            <InvoiceTable shortList={true} invoices={matchingInvoices} />
          </div>
          <div className="flex flex-col w-full items-start ml-2">
            <Link to="transactions" className="mx-2 my-2">
              <EditButton className="mx-2">View All Transactions</EditButton>
            </Link>
            <TransactionTable
              shortList={true}
              transactions={matchingTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFinancials;
