import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import ClientTable from "../ClientTable/ClientTable";

// import "./clientsContainer.css";
import ProjectsTable from "../dashboardTables/ProjectsTable/ProjectsTable";

const rootClass = "client-container";

const ProjectsContainer = ({ clientProjects, projectContainer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`${rootClass}-main-container`}>
        <div
          key={projectContainer.id}
          className={`${rootClass}-status-container`}
        >
          <div className={`${rootClass}-header-section`}>
            <h5 className={`${rootClass}-state-label`}>
              {projectContainer.state}
            </h5>
            {isExpanded ? (
              <FaChevronUp
                onClick={handleClick}
                className={`${rootClass}-carrot`}
              />
            ) : (
              <FaChevronDown
                onClick={handleClick}
                className={`${rootClass}-carrot`}
              />
            )}
          </div>

          {isExpanded && (
            <ProjectsTable
              key={projectContainer.id}
              projectContainer={projectContainer}
              projects={clientProjects}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContainer;
