import React from "react";
import InvoiceTable from "../../../../components/dashboardBilling/InvoiceTable/InvoiceTable";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

const ProjectFinancials = () => {
  const { id: projectId } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES);

  if (invoicesLoading) return <Spinner />;
  if (invoicesError)
    return <p>There was a problem loading the client invoices...</p>;

  const invoicesArray = invoicesData.invoices;

  const matchingInvoices = invoicesArray.filter(
    (invoice) => invoice.project.id === projectId
  );

  return (
    <div className="mt-2">
      <InvoiceTable invoices={matchingInvoices} />
    </div>
  );
};

export default ProjectFinancials;
