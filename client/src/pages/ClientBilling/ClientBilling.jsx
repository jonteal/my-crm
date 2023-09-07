import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import InvoiceTable from "../../components/InvoiceTable/InvoiceTable";
import Spinner from "../../components/Spinner/Spinner";

import { GET_INVOICES } from "../../graphql/queries/invoiceQueries";
import { GET_CLIENT } from "../../graphql/queries/clientQueries";

export const fakeInvoices = [
  {
    id: 1,
    date: "March, 01, 2020",
    invoiceNumber: "#MS-415646",
    amount: "$180",
  },
  {
    id: 2,
    date: "March, 05, 2021",
    invoiceNumber: "#MS-415647",
    amount: "$250",
  },
  {
    id: 3,
    date: "September, 01, 2021",
    invoiceNumber: "#MS-415648",
    amount: "$170",
  },
  {
    id: 4,
    date: "February, 09, 2022",
    invoiceNumber: "#MS-415649",
    amount: "$200",
  },
];

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

  if (invoicesLoading) return <Spinner />;
  if (invoicesError)
    return <p>There was a problem loading the client invoices...</p>;

  const invoicesArray = invoicesData.invoices;

  const client = clientData.client;

  const clientId = clientData.client.id;
  const matchingInvoices = invoicesArray.filter(
    (invoice) => invoice.client.id === clientId
  );

  return (
    <div className="w-full">
      <InvoiceTable invoices={matchingInvoices} />
    </div>
  );
};

export default ClientBilling;
