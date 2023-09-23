import { useEffect, useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import { BsCheckCircle } from "react-icons/bs";
import { PiPauseDuotone } from "react-icons/pi";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const StatusBadge = ({ status }) => {
  const [statusColor, setStatusColor] = useState("");

  useEffect(() => {
    if (status === "Not Started") {
      setStatusColor("bg-yellow-500");
    } else if (status === "In Progress") {
      setStatusColor("bg-green-600");
    } else if (status === "Completed") {
      setStatusColor("bg-sky-600");
    } else if (status === "Paused") {
      setStatusColor("bg-red-600");
    } else if (status === "Needs Attention") {
      setStatusColor("bg-orange-500");
    }
  }, [status]);

  const getIcon = (status) => {
    if (status === "Not Started") {
      return <CiNoWaitingSign />;
    } else if (status === "In Progress") {
      return <GiProgression />;
    } else if (status === "Completed") {
      return <BsCheckCircle />;
    } else if (status === "Paused") {
      return <PiPauseDuotone />;
    } else {
      return <AiOutlineExclamationCircle />;
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div
        className={`${statusColor} rounded-lg flex flex-row items-center py-1 px-2`}
      >
        <span className="text-slate-50 mx-1">{getIcon(status)}</span>

        <p className={`text-center text-sm text-slate-50 mx-1`}>{status}</p>
      </div>
    </div>
  );
};

export default StatusBadge;
