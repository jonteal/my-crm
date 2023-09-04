// COMPONENTS
// import ClientCardItem from "../ClientCardItem/ClientCardItem";

import "./clientCard.css";

const rootClass = "client-card";

const ClientCard = ({ clientData }) => {
  let formatPhoneNumber = (str) => {
    let cleaned = ("" + str).replace(/\D/g, "");
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }

    return null;
  };

  const {
    companyName,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    status,
  } = clientData.client;

  return (
    <div className={`${rootClass}-info-container`}>
      <div className={`${rootClass}-inner-name h-screen`}>
        <h1 className="text-slate-700 text-2xl font-bold text-left ml-5 mb-5">
          {companyName}
        </h1>
        <div className="flex flex-col ml-5 my-3">
          <p className="text-slate-600 font-light text-left text-sm">Contact</p>
          <p className="text-slate-800 font-normal text-left text-base">{`${firstName} ${lastName}`}</p>
        </div>

        <div className="flex flex-col ml-5 my-3">
          <p className="text-slate-600 font-light text-left text-sm">
            Primary Phone Number
          </p>
          <p className="text-slate-800 font-normal text-left text-base">
            {formatPhoneNumber(phoneNumber)}
          </p>
        </div>

        <div className="flex flex-col ml-5 my-3">
          <p className="text-slate-600 font-light text-left text-sm">
            Primary Email Address
          </p>
          <p className="text-slate-800 font-normal text-left text-base">
            {emailAddress}
          </p>
        </div>

        <div className="flex flex-col ml-5 my-3">
          <p className="text-slate-600 font-light text-left text-sm">
            Client Status
          </p>
          <p className="text-slate-800 font-normal text-left text-base">
            {status}
          </p>
        </div>

        {/* <ClientCardItem
          header="First Name"
          value={clientData.client.firstName}
        />

        



        <ClientCardItem header="Last Name" value={clientData.client.lastName} />

        <ClientCardItem
          header="Company Name"
          value={clientData.client.companyName}
        />

        <ClientCardItem
          header="Email Address"
          value={clientData.client.emailAddress}
        />

        <ClientCardItem
          header="Phone Number"
          value={formatPhoneNumber(clientData.client.phoneNumber)}
        /> */}
      </div>
    </div>
  );
};

export default ClientCard;
