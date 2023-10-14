import { FaRegFilePdf } from "react-icons/fa";

const InvoiceTableItem = ({ invoice }) => {
  const { date, invoiceNumber, amount, project } = invoice;

  return (
    <div className="flex flex-row justify-between my-3">
      <div className="flex flex-row items-center">
        <div className="flex flex-col mr-5">
          <p className="text-left text-slate-700 text-base font-semibold mx-3 my-1">
            {date}
          </p>
          <p className="text-left text-slate-500 text-sm mx-3">
            # {invoiceNumber}
          </p>
        </div>
        {/* <div className="flex flex-col">
          <p>{`${project.title ? "Project: " : "Reason: "}`}</p>
          <p className="text-left text-slate-500 text-sm mx-3">
            {project.title}
          </p>
        </div> */}
      </div>
      <div className="flex flex-row items-center">
        <p className="text-left text-slate-500 text-base mx-4">$ {amount}</p>
        <p className="flex flex-row items-center">
          <FaRegFilePdf className="text-lg" />
          <span className="text-left text-slate-700 text-sm font-bold ml-1 mr-3">
            PDF
          </span>
        </p>
      </div>
    </div>
  );
};

export default InvoiceTableItem;
