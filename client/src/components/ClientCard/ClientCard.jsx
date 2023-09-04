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

  return (
    <div className={`${rootClass}-info-container`}>
      <div className={`${rootClass}-inner-name`}>
        <div className={`${rootClass}-item-container`}>
          <h2 className={`${rootClass}-client-header`}>Client Information</h2>
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
