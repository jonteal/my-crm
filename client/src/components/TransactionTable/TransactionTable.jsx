import { Link, useParams } from "react-router-dom";
import AddButton from "../reusable/buttons/AddButton/AddButton";
import ClientTransactionItem from "../dashboardBilling/ClientTransactionItem/ClientTransactionItem";

const TransactionTable = ({ transactions, shortList }) => {
  const { clientId, projectId } = useParams();
  const filteredList = shortList ? transactions : transactions.slice(0, 5);

  return (
    <div className="bg-slate-50 w-full rounded-xl mx-2 pb-2">
      <div className="flex flex-row justify-between py-3 px-2">
        <h2 className="text-left text-slate-700 text-lg mx-2">Transactions</h2>
        <Link
          to={`/clients/${clientId}/projects/${projectId}/financials/addTransaction`}
        >
          <AddButton className="mx-2">Add Transaction</AddButton>
        </Link>
      </div>
      {filteredList.map((transaction) => (
        <Link
          to={`/clients/${clientId}/projects/${projectId}/financials/transactions/${transaction.id}`}
        >
          <ClientTransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        </Link>
      ))}
    </div>
  );
};

export default TransactionTable;
