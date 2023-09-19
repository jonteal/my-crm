import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_INVOICE } from "../../../../graphql/queries/invoiceQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

const ProjectInvoice = () => {
  const { invoiceId } = useParams();

  const {
    loading: invoiceLoading,
    error: invoiceError,
    data: invoiceData,
  } = useQuery(GET_INVOICE, { variables: { id: invoiceId } });

  if (invoiceLoading) return <Spinner />;
  if (invoiceError)
    return <p>There was a problem loading the client invoices...</p>;

  const { amount, createdAt, date, invoiceNumber } = invoiceData.invoice;

  return (
    <div className="bg-slate-50 w-full rounded-xl mx-2 py-2 mt-2">
      <p>{invoiceNumber}</p>
      <p>{amount}</p>
      <p>{date}</p>
      <p>{createdAt}</p>
    </div>
  );
};

export default ProjectInvoice;
