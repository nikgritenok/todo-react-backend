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
  onClose: () => void
  task?: Task
}
