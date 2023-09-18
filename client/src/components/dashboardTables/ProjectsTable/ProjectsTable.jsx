import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { useQuery } from "@apollo/client";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";

// COMPONENTS
import AddButton from "../../reusable/buttons/AddButton/AddButton";

const ProjectsTable = ({ client, projects, projectContainer }) => {
  const { id } = useParams();
  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id },
  });

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <div className="flex flex-row justify-between items-center py-3">
        <h2 className="text-left text-slate-700 text-lg mx-3">
          Projects Table
        </h2>
        <Link to={`/clients/${id}/addProject`}>
          <AddButton>Add Project</AddButton>
        </Link>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-slate-400 font-light w-10 text-left pl-2">#</th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Title
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Status
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Start Date
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Deadline
            </th>
            <th className="text-slate-400 font-light w-1/12 text-left pl-2">
              Client Budget
            </th>
            <th className="text-slate-400 font-light w-1/12 text-left pl-2">
              Project Estimate
            </th>
          </tr>
        </thead>
        <tbody>
          {projects
            ?.filter((project) => project.status === projectContainer.state)
            .map((project, index) => (
              <tr key={project.id}>
                <td className="text-slate-700 font-light text-left border pl-2 pr-2">
                  {index + 1}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.title}
                >
                  {project.title}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.status}
                >
                  {project.status}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.startDate}
                >
                  {project.startDate}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.deadline}
                >
                  {project.deadline}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.clientBudget}
                >
                  $ {project.clientBudget}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.projectEstimate}
                >
                  $ {project.projectEstimate}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.id}
                >
                  <Link
                    to={`/clients/${clientData.client.id}/projects/${project.id}`}
                  >
                    <FaRegEye className="text-sky-600" />
                  </Link>
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.id}
                >
                  <Link>
                    <FaRegTrashAlt className="text-red-500" />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
