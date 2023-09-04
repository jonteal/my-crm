import { Link } from "react-router-dom";
import ClientList from "../ClientList/ClientList";
import AddButton from "../../components/buttons/AddButton/AddButton";

const Home = () => {
  return (
    <div>
      <Link to="/addClient">
        <AddButton>Add Client</AddButton>
      </Link>
      <ClientList />
    </div>
  );
};

export default Home;
