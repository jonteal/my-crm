import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";

export const Home = () => {
  return (
    <div className="mx-20">
      <div className="mt-3 flex flex-row justify-center">
        <DynamicButton
          color="lightBlue"
          type="link"
          link="clients"
          className="mx-2"
        >
          Clients
        </DynamicButton>
        <DynamicButton
          color="lightBlue"
          type="link"
          link="projects"
          className="mx-2"
        >
          Projects
        </DynamicButton>
      </div>
    </div>
  );
};
