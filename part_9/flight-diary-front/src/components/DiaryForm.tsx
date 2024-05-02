import { SubmitHandler, useForm } from "react-hook-form";

import { DiaryFormProps, DiaryEntry } from "../types";

import diaryService from "../services/diary";

const DiaryForm: React.FC<DiaryFormProps> = ({ setDiaryEntries }) => {
  const { register, handleSubmit, reset } = useForm<DiaryEntry>();

  const onSubmit: SubmitHandler<DiaryEntry> = async (data) => {
    try {
      await diaryService.add(data);
      const updateDiary = await diaryService.getAll();
      setDiaryEntries(updateDiary);
      reset();
    } catch (error) {
      console.log("Failed to add diary entry", error);
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
