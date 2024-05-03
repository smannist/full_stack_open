import { useEffect, useState } from "react";

import { DiaryEntry, ValidationError } from "./types";

import diaryService from "./services/diary";

import DiaryEntryList from "./components/DiaryEntryList";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notificationMessage, setNotificationMessage] = useState<ValidationError | null>(
    null
  );

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
      <Notification message={notificationMessage} />
      <DiaryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
        setNotificationMessage={setNotificationMessage}
      />
      <DiaryEntryList diaryEntries={diaryEntries} />
    </div>
  );
};

export default App;
