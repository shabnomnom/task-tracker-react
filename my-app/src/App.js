import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import {useState, useEffect} from 'react' //hooks to change state of components
                                          //make the effect when the page loads

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] =  useState([])

  useEffect (() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  },[]) // passing empty array for any possible dependencies 

  // Fetch Tasks 
  const fetchTasks = async () => {  // can't use async 
    const res = await fetch('http://localhost:5000/tasks') // fetch returns a promise so we want to wait that promise
    const data = await res.json()
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {  // can't use async 
    const res = await fetch(`http://localhost:5000/tasks/${id}`) // fetch returns a promise so we want to wait that promise
    const data = await res.json()
    return data
  }
  

  
  // Add Task 
  const addTask =  async(task) => {
    const res = await fetch('http://localhost:5000/tasks',
    { method: 'POST',
      headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json() 
  setTasks([...tasks, data])
}
  // const id = Math.floor(Math.random() * 1000)+1 // Math.random() * (max - min) + min;
    // const newTask = {id, ...task} //pass the task to the object
    // setTasks([...tasks, newTask])

  // Delete task 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // Toggle reminder 
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    { method: 'PUT',
      headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updateTask),
  })

  const data = await res.json() 

    setTasks(
      tasks.map((task) => task.id === id ?{
      ...data, reminder: !task.reminder} : task
      )
    )
  }
  return (
    <div className='container'>
     <Header 
      onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd = {showAddTask}
    />
    {showAddTask && <AddTask onAdd={addTask}/>}
    {tasks.length > 0 ? (
      <Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleReminder}
      />
      ):( 'There is no more tasks' )
      }
    </div> 
  
  );
}
export default App;
