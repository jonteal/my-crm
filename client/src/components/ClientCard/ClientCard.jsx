import { Link, useNavigate } from "react-router-dom";
import { EditButton } from "../reusable/buttons/EditButton/EditButton";
import { formatPhoneNumber } from "../../utils/format";
import { DELETE_CLIENT } from "../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../graphql/queries/clientQueries";
import { useMutation } from "@apollo/client";
import { DeleteModal } from "../modals/DeleteModal/DeleteModal";
import { NameValuePair } from "../../components/reusable/NameValuePair/NameValuePair";

export const ClientCard = ({ clientData }) => {
  const navigate = useNavigate();
  const {
    id,
    companyName,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    status,
  } = clientData.client;

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    onCompleted: () => navigate(`/clients`),
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  return (
    <div className="mt-1 bg-slate-50 w-full rounded-xl">
      <div className="flex flex-row justify-end">
        <div className="mt-2">
          <Link className="mr-2" to={`/clients/${id}/edit`}>
            <EditButton>Edit</EditButton>
          </Link>
        </div>
        <div className="mt-3 mr-2">
          <DeleteModal subject="Client" deleteClient={deleteClient} />
        </div>
      </div>
      <div className="h-screen px-3">
        <NameValuePair type="header" name="Company" value={companyName} />

        <NameValuePair name="Contact" value={`${firstName} ${lastName}`} />

        <NameValuePair
          name="Primary Phone Number"
          value={formatPhoneNumber(phoneNumber)}
        />

        <NameValuePair name="Primary Email Address" value={emailAddress} />

        <NameValuePair name="Client Status" value={status} />
      </div>
    </div>
  );
};
