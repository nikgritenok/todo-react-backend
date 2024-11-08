export interface Task {
  id: number;
  title: string;
  about: string;
}

export interface TaskState {
  tasks: Task[];
}
