export const NameValuePair = ({ name, value }) => {
  return (
    <div className="flex flex-col ml-2 my-2">
      <p className="text-slate-600 font-light text-left text-sm">{name}</p>
      <p className="text-slate-800 font-normal text-left text-base">{value}</p>
    </div>
  );
};
