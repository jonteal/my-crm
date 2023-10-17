import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// COMPONENTS
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { EditButton } from "../../../../components/reusable/buttons/EditButton/EditButton";
import { TransactionTable } from "../../../../components/TransactionTable/TransactionTable";
import { InvoiceTable } from "../../../../components/InvoiceTable/InvoiceTable";
import { ProgressBarComponent } from "../../../../components/ProgressBar/ProgressBar";

// GRAPHQL
import { GET_PROJECT_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";
import { GET_PROJECT_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";

export const ProjectFinancials = () => {
  const { projectId } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, { variables: { id: projectId } });

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_PROJECT_INVOICES, { variables: { projectId } });

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_PROJECT_TRANSACTIONS, { variables: { projectId } });

  if (invoicesLoading || transactionsLoading || projectLoading)
    return <Spinner />;
  if (invoicesError || transactionsError || projectError)
    return <p>There was a problem loading the client invoices...</p>;

  const invoiceSum = invoicesData.projectInvoices.reduce(function (acc, obj) {
    return acc + parseFloat(obj.amount);
  }, 0);

  const budgetUsed = (invoiceSum / projectData.project.clientBudget) * 100;

  return (
    <div className="mt-2">
      <div className="flex flex-col w-full">
        <div className="w-full mx-2 my-3">
          <h2 className="text-left my-2">Budget Used</h2>
          <ProgressBarComponent now={budgetUsed} />
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-full items-start mr-2">
            <Link to="invoices" className="mx-2 my-2">
              <EditButton className="mx-2">View All Invoices</EditButton>
            </Link>

            <InvoiceTable
              shortList={true}
              invoices={invoicesData.projectInvoices}
            />
          </div>
          <div className="flex flex-col w-full items-start ml-2">
            <Link to="transactions" className="mx-2 my-2">
              <EditButton className="mx-2">View All Transactions</EditButton>
            </Link>
            <TransactionTable
              shortList={true}
              transactions={transactionsData.projectTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
