import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../graphql/queries/projectQueries";
import ProjectPageCard from "../../components/ProjectPageCard/ProjectPageCard";
import Spinner from "../../components/reusable/Spinner/Spinner";
import { Link } from "react-router-dom";
import AddButton from "../../components/reusable/buttons/AddButton/AddButton";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <Spinner />;
  if (error) return <p>There was an error loading the comment feed</p>;

  return (
    <div className="flex flex-col">
      <Link to="/addProject" className="mx-2 mt-4">
        <AddButton>Add Project</AddButton>
      </Link>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => setSearchTerm(event.target.value)}
        className="searchBar w-40 border rounded-xl pl-3 py-1 ml-5"
      />

      <p className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
        Total Projects: {data.projects.length}
      </p>

      <div className="flex flex-row flex-wrap mx-auto">
        {data.projects
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val?.client.firstName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val?.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val?.client.lastName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((project) => (
            <ProjectPageCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
