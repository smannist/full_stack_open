import { TotalProps } from "../types";

const Total = ({ total }: TotalProps) => {
  return (
    <div>
      <p>
        <mark>Number of exercises {total}</mark>
      </p>
    </div>
  );
};

export default Total;
