import React from "react";
import InvoiceTable from "../../../../components/dashboardBilling/InvoiceTable/InvoiceTable";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import ClientTransactions from "../../../../components/dashboardBilling/ClientTransactions/ClientTransactions";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";
import EditButton from "../../../../components/reusable/buttons/EditButton/EditButton";

const ProjectFinancials = () => {
  const { projectId } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES, { variables: { id: projectId } });

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_TRANSACTIONS);

  if (invoicesLoading || transactionsLoading) return <Spinner />;
  if (invoicesError || transactionsError)
    return <p>There was a problem loading the client invoices...</p>;

  const invoicesArray = invoicesData.invoices;

  const matchingInvoices = invoicesArray.filter(
    (invoice) => invoice.project.id === projectId
  );

  const transactionsArray = transactionsData.transactions;

  const matchingTransactions = transactionsArray.filter(
    (transaction) => transaction.project.id === projectId
  );

  return (
    <div className="mt-2">
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full items-start mx-2">
          <Link to="invoices" className="mx-2 my-2">
            <EditButton className="mx-2">View All Invoices</EditButton>
          </Link>

          <InvoiceTable invoices={matchingInvoices} />
        </div>
        <div className="flex flex-col w-full items-start mx-2">
          <Link to="transactions" className="mx-2 my-2">
            <EditButton className="mx-2">View All</EditButton>
          </Link>
          <ClientTransactions transactions={matchingTransactions} />
        </div>
      </div>
    </div>
  );
};

export default ProjectFinancials;
