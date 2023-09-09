import Table from "react-bootstrap/Table";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DELETE_CLIENT } from "../../graphql/mutations/clientMutations";

import "./clientTable.css";

const ClientTable = ({ clients, clientContainer }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th className="text-slate-400 font-light w-auto text-left pl-2">#</th>
          <th className="text-slate-400 font-light w-2/12 text-left pl-2">
            First Name
          </th>
          <th className="text-slate-400 font-light w-2/12 text-left pl-2">
            Last Name
          </th>
          <th className="text-slate-400 font-light w-2/12 text-left pl-2">
            Phone Number
          </th>
          <th className="text-slate-400 font-light w-2/12 text-left pl-2">
            Email Address
          </th>
          <th className="text-slate-400 font-light w-3/12 text-left pl-2">
            Company
          </th>
          <th className="text-slate-400 font-light w-2/12 text-left pl-2">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {clients
          .filter((client) => client.status === clientContainer.state)
          .map((client, index) => (
            <tr key={client.id}>
              <td className="text-slate-700 font-light text-left border pl-2 pr-2">
                {index + 1}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.firstName}
              >
                {client.firstName}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.lastName}
              >
                {client.lastName}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.phoneNumber}
              >
                {client.phoneNumber}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.emailAddress}
              >
                {client.emailAddress}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.companyName}
              >
                {client.companyName}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.status}
              >
                {client.status}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.status}
              >
                <Link to={`/clients/${client.id}/dashboard`}>
                  <FaRegEye className="text-sky-600" />
                </Link>
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={client.status}
              >
                <Link>
                  <FaRegTrashAlt className="text-red-500" />
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ClientTable;
