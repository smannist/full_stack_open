export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiaryEntryListProps {
  diaryEntries: DiaryEntry[];
}

export interface DiaryEntryProps {
  diary: DiaryEntry;
}

export interface DiaryFormProps {
  setDiaryEntries: (entries: DiaryEntry[]) => void;
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
