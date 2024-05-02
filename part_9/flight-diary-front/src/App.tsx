import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import getAll from "./services/diary";
import Header from "./components/Header";
import DiaryEntryList from "./components/DiaryEntryList";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAll()
      .then(data => {
        setDiaryEntries(data);
      })
      .catch(error => {
        console.log("Failed to fetch diary entries:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <DiaryEntryList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
