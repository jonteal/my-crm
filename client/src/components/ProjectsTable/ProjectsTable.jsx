import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";

const ProjectsTable = ({ client, matchingProjects }) => {
  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <h2 className="text-left text-slate-700 text-lg mx-3">Projects Table</h2>
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
          {matchingProjects
            // .filter((client) => client.status === clientContainer.state)
            .map((project, index) => (
              <tr>
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
                  {project.clientBudget}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.projectEstimate}
                >
                  {project.projectEstimate}
                </td>
                <td
                  className="text-slate-700 font-light text-left border pl-2"
                  key={project.id}
                >
                  <Link to={`/clients/${client.id}/projects/${project.id}`}>
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
