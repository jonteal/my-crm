import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import InvoiceTable from "../../../../components/InvoiceTable/InvoiceTable";
import { GET_INVOICES } from "../../../../graphql/queries/invoiceQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

export const ProjectInvoices = () => {
  const { projectId } = useParams();

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES, { variables: { id: projectId } });

  if (invoicesLoading) return <Spinner />;
  if (invoicesError)
    return <p>There was a problem loading the client invoices...</p>;

  const matchingInvoices = invoicesData.invoices.filter(
    (invoice) => invoice.project.id === projectId
  );
  return (
    <div className="mt-2">
      <InvoiceTable shortList={false} invoices={matchingInvoices} />
    </div>
  );
};
