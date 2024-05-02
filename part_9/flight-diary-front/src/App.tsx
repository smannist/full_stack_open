import { useEffect, useState } from "react";

import { DiaryEntry } from "./types";

import diaryService from "./services/diary";

import DiaryEntryList from "./components/DiaryEntryList";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService
      .getAll()
      .then((data) => {
        setDiaryEntries(data);
      })
      .catch((error) => {
        console.log("Failed to fetch diary entries:", error);
      });
  }, []);

  return (
    <div>
      <DiaryForm setDiaryEntries={setDiaryEntries}/>
      <DiaryEntryList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
