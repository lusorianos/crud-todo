import Badge from "../components/badge";
import Text from "../components/text";
import useTasks from "../hooks/use-tasks";

export default function TasksSummary() {
  const { createdTasksCount, concludedTasksCount, isLoadingTasks } = useTasks();
  return(
    <>
      <div className='inline-flex items-center gap-2'>
        <Text variant="body-sm-bold" className='text-gray-300'>Tasks created</Text>
        <Badge variant="secondary" loading={isLoadingTasks}>{createdTasksCount}</Badge>
      </div>
      <div className='inline-flex items-center gap-2'>
        <Text variant="body-sm-bold" className='text-gray-300'>Completed</Text>
        <Badge variant="primary" loading={isLoadingTasks}>{concludedTasksCount} of {createdTasksCount}</Badge>
      </div>
    </>
  )
}