import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskThunk } from "../../features/TaskListThunk";
import { addTask, deleteTask } from "../../features/TaskListSlice"; 
import Swal from 'sweetalert2';  
import { TbTrash } from 'react-icons/tb';

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
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="Task_Title"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="Task_Description"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {TaskList.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <TbTrash title="Delete task" onClick={() => handleDeleteTask(task.id)} />  {/* Corregido de row.id a task.id */}
          </li>
        ))}
      </ul>
    </>
  );
};
