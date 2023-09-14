import TotalClients from "../../../components/mainDashboard/TotalClients/TotalClients";
// import Spinner from "../../../components/reusable/Spinner/Spinner";
import { GET_CLIENTS } from "../../../graphql/queries/clientQueries";
import { GET_INVOICES } from "../../../graphql/queries/invoiceQueries";
import { useQuery } from "@apollo/client";

const MainDashboard = () => {
  // This Month's Sales / Revenue
  // Annual Revenue Graph

  const {
    loading: clientLoading,
    error: clientError,
    data: clientsData,
  } = useQuery(GET_CLIENTS);

  const {
    loading: invoicesLoading,
    error: invoicesError,
    data: invoicesData,
  } = useQuery(GET_INVOICES);

  //   if (clientLoading) return <Spinner />;
  if (clientError) return <p>There was an error loading the content</p>;

  return (
    <div className="bg-slate-200 h-screen">
      {clientsData && <TotalClients clientsData={clientsData} />}
    </div>
  );
};

export default MainDashboard;
