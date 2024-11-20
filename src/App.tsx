import { Pagination } from "./components/Pagination/Pagination"
import { TaskInput } from "./components/TaskInput/TaskInput"
import { TaskList } from "./components/TaskList/TaskList"

function App() {
  return (
    <>
      <TaskInput />
      <Pagination />
      <TaskList />
    </>
  )
}

export default App
