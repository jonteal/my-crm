import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { BsHouseDoor } from "react-icons/bs";

import { AddButton } from "../../reusable/buttons/AddButton/AddButton";

export const InHouseServices = ({ services }) => {
  const { clientId, projectId } = useParams();

  return (
    <div className="rounded-xl bg-slate-50 mx-2 mt-3 px-3 w-full">
      <div className="flex flex-row justify-between items-center py-3">
        <div className="flex flex-row items-center">
          <BsHouseDoor />
          <h2 className="text-left text-slate-700 text-lg mx-2">
            In House Services
          </h2>
        </div>
        <Link to={`/clients/${clientId}/projects/${projectId}/addService`}>
          <AddButton>Add Service</AddButton>
        </Link>
      </div>
      {services.length === 0 ? (
        <p className="italic text-lg py-3 px-2">
          You do not currently have any active services for this project
        </p>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th className="text-slate-400 font-light w-10 text-left pl-2">
                #
              </th>
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
            {services.map((service, index) => (
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
                  {service.endDate === "Invalid date"
                    ? "Current"
                    : service.endDate}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
