import { DynamicButton } from "../../../components/reusable/buttons/DynamicButton/DynamicButton";

export const Home = () => {
  return (
    <div className="mx-20">
      <div className="mt-3">
        <DynamicButton type="link" link="clients" className="mx-2">
          Clients
        </DynamicButton>
        <DynamicButton type="link" link="projects" className="mx-2">
          Projects
        </DynamicButton>
      </div>
    </div>
  );
};
