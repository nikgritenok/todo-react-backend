export interface ITask {
  id: number;
  title: string;
  about: string;
}

export interface TaskState {
  tasks: ITask[];
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: ITask;
}
