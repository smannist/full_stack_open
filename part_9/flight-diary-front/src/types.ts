export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface DiaryEntryListProps {
  diaryEntries: DiaryEntry[];
}

export interface DiaryEntryProps {
  diary: DiaryEntry;
}

export interface DiaryFormProps {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: (entries: DiaryEntry[]) => void;
  setNotificationMessage: (message: ValidationError | null) => void;
}

export interface NotificationProps {
  message: ValidationError | null;
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
