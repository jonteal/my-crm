import { Link } from "react-router-dom";
import ClientList from "../ClientList/ClientList";
import AddButton from "../../components/buttons/AddButton/AddButton";

const Home = () => {
  return (
    <div>
      <div className="mt-3">
        <Link to="/addClient">
          <AddButton>Add Client</AddButton>
        </Link>
      </div>
      <ClientList />
    </div>
  );
};

export default Home;
