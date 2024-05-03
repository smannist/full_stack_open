import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  DiaryFormProps,
  DiaryEntry,
  ValidationError,
  Weather,
  Visibility,
} from "../types";

import diaryService from "../services/diary";

const DiaryForm: React.FC<DiaryFormProps> = ({
  diaryEntries,
  setDiaryEntries,
  setNotificationMessage,
}) => {
  const { register, handleSubmit, reset } = useForm<DiaryEntry>();

  const handleNotification = (message: ValidationError) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const onSubmit: SubmitHandler<DiaryEntry> = async (data) => {
    try {
      const newEntry = await diaryService.add(data);
      const updatedEntries = diaryEntries.concat(newEntry);
      setDiaryEntries(updatedEntries);
      reset();
    } catch (error) {
      if (
        axios.isAxiosError<ValidationError, Record<string, unknown>>(error) &&
        error.response
      ) {
        const errorMessage = error.response.data;
        handleNotification(errorMessage);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div>
          Date:
          <input type="date" {...register("date")} />
        </div>
        <div>
          Visibility:
          {Object.values(Visibility).map((value) => (
            <label key={value}>
              <input type="radio" value={value} {...register("visibility")} />
              {value}
            </label>
          ))}
        </div>
        <div>
          Weather:
          {Object.values(Weather).map((value) => (
            <label key={value}>
              <input type="radio" value={value} {...register("weather")} />
              {value}
            </label>
          ))}
        </div>
        <div>
          Comment:
          <input {...register("comment")} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
