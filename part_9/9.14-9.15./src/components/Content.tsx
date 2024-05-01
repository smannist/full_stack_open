import { ContentProps, Contents } from "../types";

const Content = ({ contents }: ContentProps) => {
  return (
    <div>
      {Object.values(contents).map((content: Contents) => (
        <p key={content.name}>
          {content.name} {content.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
