import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";

const ClientTransactionItem = ({ transaction }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full px-4">
      <div className="flex flex-row items-center">
        <BsArrowUpSquare className="text-lime-600 text-xl" />
        <div className="flex flex-col items-start mx-4">
          <p className="text-left text-slate-800 text-base">
            {transaction.paymentParty}
          </p>
          <p className="text-left text-slate-500 text-sm">
            {transaction.paymentDate}
          </p>
        </div>
      </div>
      <p className="text-lime-600 text-base font-semibold">
        + ${transaction.amount}
      </p>
    </div>
  );
};

export default ClientTransactionItem;
