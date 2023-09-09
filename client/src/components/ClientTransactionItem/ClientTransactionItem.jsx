import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";

const ClientTransactionItem = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full px-4">
      <div className="flex flex-row items-center">
        <BsArrowUpSquare className="text-lime-600 text-xl" />
        <div className="flex flex-col items-start mx-4">
          <p className="text-left text-slate-800 text-base">Squarespace</p>
          <p className="text-left text-slate-500 text-sm">
            27 March 2020, at 12:30 PM
          </p>
        </div>
      </div>
      <p className="text-lime-600 text-base font-semibold">+ $1200</p>
    </div>
  );
};

export default ClientTransactionItem;
