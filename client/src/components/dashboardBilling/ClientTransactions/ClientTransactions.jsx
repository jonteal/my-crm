import { Link } from "react-router-dom";
import EditButton from "../../reusable/buttons/EditButton/EditButton";
import AddButton from "../../reusable/buttons/AddButton/AddButton";
import ClientTransactionItem from "../ClientTransactionItem/ClientTransactionItem";

const ClientTransactions = ({ transactions }) => {
  console.log("transactions: ", transactions);
  return (
    <div className="bg-slate-50 w-1/2 rounded-xl mx-2 py-2">
      <div className="flex flex-row justify-between py-3 px-2">
        <h2 className="text-left text-slate-700 text-lg mx-2">Transactions</h2>
        <Link to="addTransaction">
          <AddButton className="mx-2">Add Transaction</AddButton>
        </Link>
        <Link to="transactions">
          <EditButton className="mx-2">View All</EditButton>
        </Link>
      </div>
      {transactions.map((transaction) => (
        <ClientTransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default ClientTransactions;
