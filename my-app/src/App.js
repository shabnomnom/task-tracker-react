import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import {useState} from 'react' //hook

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] =  useState( 
    [
      {
        "id": 1,
        "text": "Doctors Appointment",
        "day": "Feb 5th at 2:30pm",
        "reminder": true
      },
      {
        "id": 2,
        "text": "Meeting at School",
        "day": "Feb 6th at 1:30pm",
        "reminder": true
      }
    ]
  )

  // Add Task 
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000)+1 // Math.random() * (max - min) + min;
    
    const newTask = {id, ...task} //pass the task to the object
    setTasks([...tasks, newTask])
  }

  // Delete task 
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  // Toggle reminder 
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => task.id === id ?{
      ...task, reminder: !task.reminder} : task
      )
    )
  }
  return (
    <div className='container'>
    <Header onAdd={() => setShowAddTask(!showAddTask)} 
    showAdd = {showAddTask}/>
    {showAddTask && <AddTask onAdd={addTask}/>}
    {tasks.length > 0 ?
      <Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleReminder}/>
      : 'There is no more tasks' }
    </div> 
          
  );
}

export default App;
