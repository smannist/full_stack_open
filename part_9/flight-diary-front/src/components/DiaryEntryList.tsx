import { DiaryEntryListProps } from "../types";
import DiaryEntry from "./DiaryEntry";

const DiaryEntryList = ({ diaryEntries }: DiaryEntryListProps) => {
  return (
    <div>
      {diaryEntries.map((entry) => (
        <DiaryEntry key={entry.id} diary={entry} />
      ))}
    </div>
  );
};

export default DiaryEntryList;
