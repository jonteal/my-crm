import ProjectInfoItem from "../../../../components/ProjectInfoItem/ProjectInfoItem";

const ClientProfile = ({ project }) => {
  const rootClass = "project-view";

  console.log("project: ", project);
  console.log("project title: ", project?.title);

  //   const {
  //     title,
  //     description,
  //     notes,
  //     status,
  //     startDate,
  //     deadline,
  //     clientBudget,
  //     projectEstimate,
  //   } = project;

  return (
    <div className={`${rootClass}-main-container px-0 flex flex-col w-full`}>
      <div className="flex flex-row">
        <div className="rounded-xl bg-slate-50 mx-2 mt-3 p-2 w-full">
          {/* <div className={`${rootClass}-btn-container`}>
      <Link to={`/projects/${project.id}/edit`}>
        <SubmitButton className={`${rootClass}-edit-btn`}>
          Edit
        </SubmitButton>
      </Link>
    </div> */}
          <div className={`${rootClass}-project-info`}>
            <div className="flex flex-col ml-5 my-3">
              <p className="text-slate-600 font-light text-left text-sm">
                Title
              </p>
              <h1 className="text-slate-800 font-normal text-left text-2xl">
                {project?.title}
              </h1>
            </div>
            <ProjectInfoItem name="Description" value={project?.description} />
            <ProjectInfoItem name="Notes" value={project?.notes} />
            <ProjectInfoItem name="Status" value={project?.status} />
            <ProjectInfoItem name="Start Date" value={project?.startDate} />
            <ProjectInfoItem name="Deadline" value={project?.deadline} />
            <ProjectInfoItem
              name="Client Budget"
              value={project?.clientBudget}
            />
            <ProjectInfoItem
              name="Project Estimate"
              value={project?.projectEstimate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
