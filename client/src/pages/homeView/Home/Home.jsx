import { Link } from "react-router-dom";
import AddButton from "../../../components/reusable/buttons/AddButton/AddButton";
import SubmitButton from "../../../components/reusable/buttons/submitButton/SubmitButton";

const Home = () => {
  return (
    <div className="mx-20">
      <div className="mt-3">
        <Link to="clients" className="mx-2">
          <SubmitButton>Clients</SubmitButton>
        </Link>
        <Link to="projects" className="mx-2">
          <SubmitButton>Projects</SubmitButton>
        </Link>
      </div>
    </div>
  );
};

export default Home;
