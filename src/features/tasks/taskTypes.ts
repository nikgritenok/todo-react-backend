export interface Task {
  id: string
  title: string
  about: string
  index: number
  pinned: boolean
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
