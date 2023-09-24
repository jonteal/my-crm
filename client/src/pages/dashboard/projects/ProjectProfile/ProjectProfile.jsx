import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../../../graphql/queries/projectQueries";
import { NameValuePair } from "../../../../components/reusable/NameValuePair/NameValuePair";
import SubmitButton from "../../../../components/reusable/buttons/submitButton/SubmitButton";

export const ProjectProfile = () => {
  const { projectId, clientId } = useParams();

  const {
    loading: projectLoading,
    error: projectError,
    data: projectData,
  } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

  if (projectLoading) return <p>Loading...</p>;
  if (projectError) return <p>There was an error loading project...</p>;

  const {
    title,
    description,
    notes,
    status,
    startDate,
    deadline,
    clientBudget,
    projectEstimate,
  } = projectData.project;

  return (
    <div className="px-0 flex flex-col w-full">
      <div className="flex flex-row">
        <div className="rounded-xl bg-slate-50 mx-2 mt-3 p-2 w-full">
          <div className="w-full flex flex-row justify-end">
            <Link to={`/clients/${clientId}/projects/${projectId}/edit`}>
              <SubmitButton>Edit</SubmitButton>
            </Link>
          </div>
          <>
            <div className="flex flex-col ml-2 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Title
              </p>
              <h1 className="text-slate-800 font-normal text-left text-2xl">
                {title}
              </h1>
            </div>
            <NameValuePair name="Description" value={description} />
            <NameValuePair name="Notes" value={notes} />
            <NameValuePair name="Status" value={status} />
            <NameValuePair name="Start Date" value={startDate} />
            <NameValuePair name="Deadline" value={deadline} />
            <NameValuePair name="Client Budget" value={`$ ${clientBudget}`} />
            <NameValuePair
              name="Project Estimate"
              value={`$ ${projectEstimate}`}
            />
          </>
        </div>
      </div>
    </div>
  );
};
