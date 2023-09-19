import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION } from "../../../../graphql/queries/transactionQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";

const ProjectTransaction = () => {
  const { transactionId } = useParams();

  const {
    loading: transactionLoading,
    error: transactionError,
    data: transactionData,
  } = useQuery(GET_TRANSACTION, { variables: { id: transactionId } });

  if (transactionLoading) return <Spinner />;
  if (transactionError)
    return <p>There was a problem loading the project transactions...</p>;

  const {
    amount,
    client,
    createdAt,
    incomingOutgoing,
    paymentDate,
    paymentParty,
    project,
  } = transactionData.transaction;

  return (
    <div>
      <p>$ {amount}</p>
      <p>{client.firstName + " " + client.lastName}</p>
      <p>Created: {createdAt}</p>
      <p>Type: {incomingOutgoing}</p>
      <p>Payment Date: {paymentDate}</p>
      <p>{paymentParty}</p>
      <p>{project.title}</p>
    </div>
  );
};

export default ProjectTransaction;
