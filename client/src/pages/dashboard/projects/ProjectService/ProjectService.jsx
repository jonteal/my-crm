import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_SERVICE } from "../../../../graphql/queries/serviceQueries";
import { Spinner } from "../../../../components/reusable/Spinner/Spinner";
import { NameValuePair } from "../../../../components/reusable/NameValuePair/NameValuePair";

export const ProjectService = () => {
  const { serviceId } = useParams();

  const { loading, error, data } = useQuery(GET_SERVICE, {
    variables: { id: serviceId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  const {
    service,
    cost,
    paymentSchedule,
    status,
    serviceProvider,
    startDate,
    endDate,
    notes,
    createdAt,
  } = data.service;

  const projectTitle = data.service.project.title;

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 p-2 w-full">
      <NameValuePair type="header" name="Service" value={service} />
      <NameValuePair name="Project" value={projectTitle} />
      <NameValuePair name="Cost" value={`$ ${cost}`} />
      <NameValuePair name="Payment Schedule" value={paymentSchedule} />
      <NameValuePair name="Provider" value={serviceProvider} />
      <NameValuePair name="Status" value={status} />
      <NameValuePair name="Start Date" value={startDate} />
      <NameValuePair name="End Date" value={endDate} />
      <NameValuePair name="Notes" value={notes} />
      <NameValuePair name="Created" value={createdAt} />
    </div>
  );
};
