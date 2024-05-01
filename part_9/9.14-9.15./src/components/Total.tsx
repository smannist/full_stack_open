import { TotalProps } from "../types";

const Total = ({ total }: TotalProps) => {
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

export default Total;
