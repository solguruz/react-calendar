export interface EventData {
  date: string;
  task: {
    startTime: string;
    endTime: string;
    title: string;
  }[];
}

export interface WeekData {
  startTime: string;
  endTime: string;
  title: string;
}
