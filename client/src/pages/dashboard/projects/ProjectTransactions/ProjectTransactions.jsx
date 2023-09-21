import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactionQueries";

import ClientTransactions from "../../../../components/TransactionTable/TransactionTable";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

export const ProjectTransactions = () => {
  const { projectId } = useParams();

  const {
    loading: transactionsLoading,
    error: transactionsError,
    data: transactionsData,
  } = useQuery(GET_TRANSACTIONS);

  if (transactionsLoading) return <Spinner />;
  if (transactionsError)
    return <p>There was a problem loading the client invoices...</p>;

  const matchingTransactions = transactionsData.transactions.filter(
    (transaction) => transaction.project.id === projectId
  );
  return (
    <div className="mt-2">
      <ClientTransactions
        shortList={false}
        transactions={matchingTransactions}
      />
    </div>
  );
};
