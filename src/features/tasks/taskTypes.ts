export interface Task {
  id: number
  title: string
  about: string
}

export interface TaskProps {
  task: Task
}

export interface TasksState {
  tasks: Task[]
}

export interface ModalProps {
  isOpen: boolean
  onClose: (e: React.MouseEvent) => void
  task?: Task
}
