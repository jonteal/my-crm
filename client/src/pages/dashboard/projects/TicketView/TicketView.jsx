import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TICKET } from "../../../../graphql/queries/ticketQueries";
import Spinner from "../../../../components/reusable/Spinner/Spinner";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { NameValuePair } from "../../../../components/reusable/NameValuePair/NameValuePair";
// import { FaRegEdit } from "react-icons/fa";

export const TicketView = () => {
  const { ticketId } = useParams();
  const {
    loading: ticketLoading,
    error: ticketError,
    data: ticketData,
  } = useQuery(GET_TICKET, {
    variables: { id: ticketId },
  });

  const navigate = useNavigate();

  const handleBackNavigate = () => {
    navigate(-1);
  };

  if (ticketLoading) return <Spinner />;
  if (ticketError) return <p>Something went wrong</p>;

  const { title, description, status, createdAt } = ticketData.ticket;

  console.log("ticketData: ", ticketData);

  return (
    <div className="h-screen border-slate-500 rounded-xl">
      {!ticketLoading && !ticketError && (
        <div className="h-screen bg-slate-50 mx-2 mt-2 rounded-xl">
          <div className="mx-auto w-100 p-5">
            <div className="flex flex-row justify-between">
              <button
                onClick={handleBackNavigate}
                className="flex flex-row items-center hover:bg-slate-200 py-2 px-3 border rounded-xl"
              >
                <FaRegArrowAltCircleLeft className="mr-2" /> <span>Back</span>
              </button>
            </div>

            <div className="mt-5 flex flex-col items-start border py-2">
              <div className="px-3 py-0 m-2">
                <p className="text-slate-600 font-light text-left text-sm mb-1">
                  Title
                </p>
                <p className="text-slate-800 font-normal text-left text-lg border px-3 py-1 rounded-md">
                  {title}
                </p>
              </div>
              <div className="px-3 py-0 m-2 w-full">
                <p className="text-slate-600 font-light text-left text-sm mb-1">
                  Description
                </p>

                <p className="border w-full h-auto text-left pl-2 px-3 py-1 rounded-md">
                  {description}
                </p>
              </div>
              <div className="px-3 py-0 m-2">
                <p className="text-slate-600 font-light text-left text-sm mb-1">
                  Status
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md">
                  {status}
                </p>
              </div>
              <div className="px-3 py-0 m-2">
                <p className="text-slate-600 font-light text-left text-sm mb-1">
                  Created:
                </p>
                <p className="text-slate-800 font-normal text-left text-base border px-3 py-1 rounded-md">
                  {createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
