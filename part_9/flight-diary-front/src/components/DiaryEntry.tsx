import { DiaryEntryProps } from "../types";

const DiaryEntry = ({ diary }: DiaryEntryProps) => {
  return (
    <div key={diary.id}>
      <h3>{diary.date}</h3>
      <p>Visibility: {diary.visibility}</p>
      <p>Weather: {diary.weather}</p>
    </div>
  );
};

export default DiaryEntry;
