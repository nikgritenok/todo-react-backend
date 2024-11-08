export interface ITask {
  id: number;
  title: string;
  about: string;
}

export interface TaskState {
  tasks: ITask[];
}
