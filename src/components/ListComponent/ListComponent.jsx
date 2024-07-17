import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskThunk } from "../../features/TaskListThunk";
import { addTask, deleteTask } from "../../features/TaskListSlice"; 
import Swal from 'sweetalert2';  
import { TbTrash } from 'react-icons/tb';
import { Container, TaskForm, TaskInput, TaskButton, TaskMainTitle, TaskListItem, ItemTitle, ItemText } from "./ListStyled.js";

export const ListComponent = () => {
  const dispatch = useDispatch();
  const TaskList = useSelector((state) => state.task.data); 
  const TaskStatus = useSelector((state) => state.task.status); 
  const TaskError = useSelector((state) => state.task.error); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (TaskStatus === 'idle') {
      dispatch(TaskThunk());
    } else if (TaskStatus === 'rejected') {
      alert('Error: ' + TaskError);
    }
  }, [TaskStatus, dispatch, TaskError]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(addTask({
      id: Date.now(),
      title,
      description,
      completed: false,
    }));
    setTitle(''); 
    setDescription('');
  };

  const handleDeleteTask = (taskId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteTask(taskId))  
                .then(() => {
                    Swal.fire('Deleted!', 'The task has been deleted.', 'success');
                })
                .catch((error) => {
                    Swal.fire('Error!', 'There was an error deleting the task.', 'error');
                });
        }
    });
  };

  return (
    <>
    <Container>
      <TaskForm onSubmit={submitHandler}>
      <TaskMainTitle>To-Do List!</TaskMainTitle>
        <TaskInput
          type="text"
          name="Task_Title"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TaskInput
          type="text"
          name="Task_Description"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TaskButton  type="submit">Add Task</TaskButton >
      </TaskForm>

      <ul>
        {TaskList.map((task) => (
          <TaskListItem  key={task.id}>
            <ItemTitle>{task.title}</ItemTitle>
            <ItemText>{task.description}</ItemText>
            <TbTrash title="Delete task" onClick={() => handleDeleteTask(task.id)} />  {/* Corregido de row.id a task.id */}
          </TaskListItem >
        ))}
      </ul>
      </Container>
    </>
  );
};
