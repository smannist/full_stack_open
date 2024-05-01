import { PartProps } from "../types";

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p> Project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Submit to: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return null;
  }
};

export default Part;
