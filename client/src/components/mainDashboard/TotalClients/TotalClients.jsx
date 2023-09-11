const TotalClients = ({ clientsData }) => {
  return (
    <div className="bg-slate-50 w-1/6 rounded-xl mx-2 mt-2 mb-3 py-2">
      <div className="flex flex-col justify-center py-2 px-2">
        <h2 className="text-slate-700 text-lg font-semibold">Total Clients</h2>
        <p className="text-lime-700 text-lg">{clientsData.clients.length}</p>
      </div>
    </div>
  );
};

export default TotalClients;
