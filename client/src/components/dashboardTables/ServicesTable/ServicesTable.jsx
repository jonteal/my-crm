import Table from "react-bootstrap/Table";

import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import AddButton from "../../reusable/buttons/AddButton/AddButton";
import { Link, useParams } from "react-router-dom";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";
import { useQuery } from "@apollo/client";

const ServicesTable = ({ matchingServices }) => {
  const { id } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id },
  });

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <div className="flex flex-row justify-between items-center py-3">
        <h2 className="text-left text-slate-700 text-lg mx-3">
          Services Table
        </h2>
        <Link to={`/clients/${id}/addService`}>
          <AddButton>Add Service</AddButton>
        </Link>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-slate-400 font-light w-10 text-left pl-2">#</th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Service
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Cost
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {matchingServices.map((service, index) => (
            <tr>
              <td className="text-slate-700 font-light text-left border pl-2 pr-2">
                {index + 1}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={service.service}
              >
                {service.service}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={service.cost}
              >
                {service.cost}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={service.status}
              >
                {service.status}
              </td>

              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={service.id}
              >
                {/* <Link to={`/clients/${client.id}/projects/${service.id}`}>
                  <FaRegEye className="text-sky-600" />
                </Link> */}
              </td>
              <td
                className="text-slate-700 font-light text-left border pl-2"
                key={service.id}
              >
                {/* <Link>
                  <FaRegTrashAlt className="text-red-500" />
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ServicesTable;
