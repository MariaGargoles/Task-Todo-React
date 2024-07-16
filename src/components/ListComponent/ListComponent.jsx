import { useEffect, useState } from "react";
import data from "../../data/tasks.json"

export const ListComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const addTask = (task) => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      };

useEffect(() => {

    const LocalTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const loadTasks = async () => {
      const jsonTasks = data;
      const allTasks = [...jsonTasks, ...LocalTasks];

      //Limpiamos las tareas duplicadas by ID
      const uniqueTasks = Array.from(new Map(allTasks.map(task => [task.id, task])).values());
      setTasks(uniqueTasks);
    };

    loadTasks();
  }, []);

    const submitHandler = (event) => {
        event.preventDefault();
       const newTask =  {
        id: Date.now(),
        title,
        description,
        completed: false,
       }
       addTask(newTask);
       setTitle();
       setDescription();
    }


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
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
        </>
      );
    };