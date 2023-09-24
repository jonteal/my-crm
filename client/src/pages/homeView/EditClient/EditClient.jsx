import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";
import { UPDATE_CLIENT } from "../../../graphql/mutations/clientMutations";

// COMPONENTS
import Spinner from "../../../components/reusable/Spinner/Spinner";
import SubmitButton from "../../../components/reusable/buttons/submitButton/SubmitButton";

import "./editClient.css";

const rootClass = "edit-client";

const EditClient = () => {
  const { clientId } = useParams();
  //   const navigate = useNavigate();

  //   const handleBackNavigate = () => {
  //     navigate(-1);
  //   };

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  console.log("clientData: ", clientData);

  const client = clientData?.client;

  const [firstName, setFirstName] = useState(client?.firstName);
  const [lastName, setLastName] = useState(client?.lastName);
  const [companyName, setCompanyName] = useState(client?.companyName);
  const [phoneNumber, setPhoneNumber] = useState(client?.phoneNumber);
  const [emailAddress, setEmailAddress] = useState(client?.emailAddress);
  const [status, setStatus] = useState(() => {
    switch (client?.status) {
      case "Lead":
        return "lead";
      case "Prospect":
        return "prospect";
      case "Current":
        return "current";
      case "Former":
        return "former";
      case "Cold":
        return "cold";
      default:
        return "Unknown status";
    }
  });

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: {
      id: client?.id,
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status,
    },
    refetchQueries: [
      {
        query: GET_CLIENT,
        variables: {
          id: client?.id,
        },
      },
    ],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      return alert("Please fill out all fields");
    }

    updateClient(
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      companyName,
      status
    );
    // navigate(clientLocation);
  };

  if (clientLoading) return <Spinner />;
  if (clientError) return <p>There was an error...</p>;

  return (
    <div className={`${rootClass}-main-container w-1/3 mx-auto`}>
      {!clientLoading && !clientError && (
        <div className="mt-2">
          <form onSubmit={onSubmit}>
            <div className={`${rootClass}-name-container`}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`${rootClass}-firstName form-control`}
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`${rootClass}-lastName form-control`}
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className={`${rootClass}-company-name form-control`}
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className={`${rootClass}-phone-number form-control`}
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="text"
                  className={`${rootClass}-email-address form-control`}
                  id="emailAddress"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Client Status</label>
                <select
                  id="status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="lead">Lead</option>
                  <option value="prospect">Prospect</option>
                  <option value="current">Current</option>
                  <option value="former">Former</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
            </div>

            <div>
              <SubmitButton onClick={onSubmit} type="submit">
                Submit
              </SubmitButton>
              {/* <button
                buttonType="back"
                onClick={handleBackNavigate}
                type="button"
                className={`${rootClass}-back-btn`}
              >
                Back
              </button> */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditClient;
