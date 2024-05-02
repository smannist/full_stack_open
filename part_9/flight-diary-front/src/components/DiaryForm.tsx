import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

import { DiaryFormProps, DiaryEntry, ValidationError } from "../types";

import diaryService from "../services/diary";

const DiaryForm: React.FC<DiaryFormProps> = ({
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
      await diaryService.add(data);
      const updateDiary = await diaryService.getAll();
      setDiaryEntries(updateDiary);
      reset();
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        const errorMessage = error.response.data;
        handleNotification(errorMessage);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div>
          Date: <input {...register("date")} />
        </div>
        <div>
          Visibility: <input {...register("visibility")} />
        </div>
        <div>
          Weather: <input {...register("weather")} />
        </div>
        <div>
          Comment: <input {...register("comment")} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
