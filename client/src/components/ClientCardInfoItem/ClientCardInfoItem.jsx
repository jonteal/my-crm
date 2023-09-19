const ClientCardInfoItem = ({ label, value }) => {
  return (
    <div className="flex flex-col ml-5 my-3">
      <p className="text-slate-600 font-light text-left text-sm">{label}</p>
      <p className="text-slate-800 font-normal text-left text-base">{value}</p>
    </div>
  );
};

export default ClientCardInfoItem;
