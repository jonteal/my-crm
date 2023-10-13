export const NameValuePair = ({ name, value, type }) => {
  return (
    <div className="flex flex-col ml-2 my-3">
      <p className="text-slate-600 font-light text-left text-sm">{name}</p>
      <p
        className={`text-slate-800 font-normal text-left ${
          type === "header" ? "text-lg" : "text-base"
        }`}
      >
        {value}
      </p>
    </div>
  );
};
