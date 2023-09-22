import Table from "react-bootstrap/Table";

import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import AddButton from "../../reusable/buttons/AddButton/AddButton";
import { Link, useParams } from "react-router-dom";

// GRAPHQL
import { GET_CLIENT } from "../../../graphql/queries/clientQueries";
import { useQuery } from "@apollo/client";

const ServicesTable = ({ matchingServices }) => {
  const { clientId, projectId } = useParams();

  const {
    loading: clientLoading,
    error: clientError,
    data: clientData,
  } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <div className="flex flex-row justify-between items-center py-3">
        <h2 className="text-left text-slate-700 text-lg mx-3">
          Third Party Services
        </h2>
        <Link to={`/clients/${clientId}/projects/${projectId}/addService`}>
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
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              Start Date
            </th>
            <th className="text-slate-400 font-light w-2/12 text-left pl-2">
              End Date
            </th>
          </tr>
        </thead>
        <tbody>
          {matchingServices.map((service, index) => (
            <tr key={service.id}>
              <td className="text-slate-700 font-light text-left border pl-2 pr-2">
                {index + 1}
              </td>
              <td className="text-slate-700 font-light text-left border pl-2">
                {service.service}
              </td>
              <td className="text-slate-700 font-light text-left border pl-2">
                $ {service.cost}
              </td>
              <td className="text-slate-700 font-light text-left border pl-2">
                {service.status}
              </td>

              <td className="text-slate-700 font-light text-left border pl-2">
                {service.startDate}
              </td>
              <td className="text-slate-700 font-light text-left border pl-2">
                {service.endDate}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ServicesTable;
