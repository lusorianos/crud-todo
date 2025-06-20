import React from "react";
import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputText from "../components/input";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";
import IconX from "../assets/icons/x-regular.svg?react";
import IconCheck from "../assets/icons/check-regular.svg?react";
import IconTrash from "../assets/icons/trash-regular.svg?react";
import IconPencil from "../assets/icons/pencil-simple-regular.svg?react";
import IconSmile from '../assets/icons/smile.svg?react';
import { TaskState, type Task } from "../models/task";
import { cx } from "class-variance-authority";
import useTask from "../hooks/use-task";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import Skeleton from "../components/skeleton";

interface TaskItemProps {
  task: Task;
  loading?: boolean;
}

export default function TaskItem({ task, loading }: TaskItemProps) {
  const [isEditing, setIsEditing] = React.useState(task?.state === TaskState.Creating);
  const [taskTitle, setTaskTitle] = React.useState(task.title || "");
  const {
    updateTask,
    updateTaskStatus,
    deleteTask,
    isDeletingTask,
    isUpdatingTask,
  } = useTask();
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleEditTask() {
    setIsEditing(true);
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value || "");
  }

  function handleExitEditTask() {
    if (task.state === TaskState.Creating) {
      deleteTask(task.id);
    }

    setIsEditing(false);
  }

  async function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await updateTask(task.id, { title: taskTitle });

    setIsEditing(false);
  }

  function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;

    updateTaskStatus(task.id, checked);
  }

  async function handleDeleteTask() {
    await deleteTask(task.id);
  }

    function handleEmojiClick(emojiData: EmojiClickData)  {
      const emoji = emojiData.emoji;
      const cursorPos = inputRef.current?.selectionStart || 0;
      const textBefore = taskTitle.substring(0, cursorPos);
      const textAfter = taskTitle.substring(cursorPos);
      const newText = textBefore + emoji + textAfter;
      setTaskTitle(newText);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
        }
      }, 0);
  }

  return(
      <Card size="md" className="min-h-16">
        {!isEditing ? (
          <div className='flex items-start gap-4'>
            <InputCheckbox checked={task?.concluded} onChange={handleChangeTaskStatus} loading={loading} />
            {!loading ? (
              <Text className={cx("flex-1 break-words", { "line-through": task?.concluded })}>
                {task?.title}
              </Text>
            ) : (
              <Skeleton className="flex-1 h-6" />
            )}
            <div className='flex items-center gap-1'>
              <ButtonIcon type="button" variant="tertiary" icon={IconTrash} onClick={handleDeleteTask} loading={loading} handling={isDeletingTask}/>
              <ButtonIcon type="button" variant="tertiary" icon={IconPencil} onClick={handleEditTask} loading={loading}/>
            </div> 
          </div>
        ) : (
          <form onSubmit={handleSaveTask} className='flex items-center gap-4'>
            <div className="flex-1 relative">
            <ButtonIcon
              type="button"
              icon={IconSmile}
              variant="tertiary"
              className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div className="absolute top-full right-0 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
              <InputText value={taskTitle} className='w-full pr-8' onChange={handleChangeTaskTitle} required autoFocus />
            </div>
            <div className='flex items-center gap-1'>
              <ButtonIcon type="button" variant="secondary" icon={IconX} onClick={handleExitEditTask}/>
              <ButtonIcon
                type="submit"
                icon={IconCheck}
                variant="primary"
                handling={isUpdatingTask}
              />
            </div> 
          </form>
        )}
      </Card>
  )
}