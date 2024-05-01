import Part from "./Part";
import { ContentProps } from "../types";

const Content = ({ contents }: ContentProps) => {
  return (
    <div>
      {contents.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
