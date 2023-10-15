import { Link } from "react-router-dom";
import { ClientList } from "../homeView/ClientList/ClientList";
import AddButton from "../../components/reusable/buttons/AddButton/AddButton";

export const Clients = () => {
  return (
    <div className="px-10 py-5">
      <Link to="/addClient" className="mx-2">
        <AddButton>Add Client</AddButton>
      </Link>
      <ClientList />
    </div>
  );
};
