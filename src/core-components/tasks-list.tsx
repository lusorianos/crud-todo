import Button from "../components/button";
import IconPlus from "../assets/icons/plus-regular.svg?react"
import TaskItem from "./task-item";
import useTasks from "../hooks/use-tasks";
import useTask from "../hooks/use-task";
import { TaskState, type Task } from "../models/task";

export default function TasksList() {
  const { tasks, isLoadingTasks } = useTasks();
  const { prepareTask } = useTask();

  function handleNewTask() {
    prepareTask();
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.concluded === b.concluded) return 0;
    if (a.concluded) return 1;
    return -1;
  });
  
  return(
    <>
      <section>
        <Button 
          icon={IconPlus}
          className='w-full'
          onClick={handleNewTask}
          disabled={tasks.some((task) => task.state === TaskState.Creating) || isLoadingTasks}>New Task</Button>
      </section>
      <section className="flex flex-col gap-2">
        {!isLoadingTasks && 
          tasks.map((task) => <TaskItem key={task.id} task={task} /> )}
        {isLoadingTasks && (
          <>
            <TaskItem task={{} as Task} loading />
            <TaskItem task={{} as Task} loading />
            <TaskItem task={{} as Task} loading />
          </>
        )}
      </section>
    </>
  )
}