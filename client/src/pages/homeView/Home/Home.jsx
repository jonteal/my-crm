import { Link } from "react-router-dom";
import ClientList from "../ClientList/ClientList";
import AddButton from "../../../components/reusable/buttons/AddButton/AddButton";

const Home = () => {
  return (
    <div className="mx-20">
      <div className="mt-3">
        <Link to="/addClient" className="mx-2">
          <AddButton>Add Client</AddButton>
        </Link>
        <Link to="/addProject" className="mx-2">
          <AddButton>Add Project</AddButton>
        </Link>
      </div>
      <ClientList />
    </div>
  );
};

export default Home;
