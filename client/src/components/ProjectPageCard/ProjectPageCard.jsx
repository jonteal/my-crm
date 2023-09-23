import { Link } from "react-router-dom";
import StatusBadge from "../reusable/StatusBadge/StatusBadge";
import { BsPersonCircle } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";

const ProjectPageCard = ({ project }) => {
  const { title, status, client } = project;
  return (
    <Link to={`/clients/${project.client.id}/projects/${project.id}/profile`}>
      <div className="border w-72 my-2 rounded-xl shadow-md py-2 mx-2 hover:bg-slate-100 flex flex-col items-center">
        <div className="flex flex-row items-center">
          <FaProjectDiagram className="mr-2" />
          <h2 className="my-2 font-bold">{title}</h2>
        </div>
        <div className="flex flex-row items-center">
          <BsPersonCircle className="mr-2" />
          <p className="my-2">{client.firstName + " " + client.lastName}</p>
        </div>
        <div className="my-2">
          <StatusBadge status={status} />
        </div>
      </div>
    </Link>
  );
};

export default ProjectPageCard;
