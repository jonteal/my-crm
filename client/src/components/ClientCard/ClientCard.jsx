import { Link } from "react-router-dom";
import EditButton from "../reusable/buttons/EditButton/EditButton";
import ClientCardInfoItem from "../ClientCardInfoItem/ClientCardInfoItem";
import { formatPhoneNumber } from "../../utils/format";
import "./clientCard.css";

const rootClass = "client-card";

const ClientCard = ({ clientData }) => {
  const {
    id,
    companyName,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    status,
  } = clientData.client;

  return (
    <div
      className={`${rootClass}-info-container mt-1 bg-slate-50 w-full rounded-xl`}
    >
      <div className="flex flex-row justify-end">
        <Link to={`/clients/${id}/edit`}>
          <EditButton>Edit</EditButton>
        </Link>
      </div>
      <div className={`${rootClass}-inner-name h-screen`}>
        <h1 className="text-slate-700 text-2xl font-bold text-left ml-5 mb-5">
          {companyName}
        </h1>
        <div className="flex flex-col ml-5 my-3">
          <p className="text-slate-600 font-light text-left text-sm">Contact</p>
          <p className="text-slate-800 font-normal text-left text-base">{`${firstName} ${lastName}`}</p>
        </div>

        <ClientCardInfoItem
          label="Primary Phone Number"
          value={formatPhoneNumber(phoneNumber)}
        />

        <ClientCardInfoItem
          label="Primary Email Address"
          value={emailAddress}
        />

        <ClientCardInfoItem label="Client Status" value={status} />
      </div>
    </div>
  );
};

export default ClientCard;
