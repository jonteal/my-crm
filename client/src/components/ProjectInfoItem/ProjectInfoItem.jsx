const ProjectInfoItem = ({ name, value }) => {
  return (
    <div className="flex flex-col ml-5 my-3">
      <p className="text-slate-600 font-light text-left text-sm">{name}</p>
      <h1 className="text-slate-800 font-normal text-left text-base">
        {value}
      </h1>
    </div>
  );
};

export default ProjectInfoItem;
