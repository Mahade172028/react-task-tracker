import Header from "./components/Header";
import {useState} from 'react';
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import {BrowserRouter as Router,Route} from "react-router-dom";
import About from "./components/About";

function App() {

  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks,setTasks] = useState([
    {
      id : 1,
      text : 'appoinment',
      date : '25 september',
      reminder: false
    },
    {
      id : 2,
      text : 'cycling',
      date : '26 september',
      reminder: false
    },
    {
      id : 3,
      text : 'TV',
      date : '27 september',
      reminder: false
    }
]);

const addTask = (task)=>{

  const id = Math.floor(Math.random()*10000)+1;

  const newTask = { id, ...task}
  setTasks([...tasks,newTask]);
  console.log(tasks);
}

const deleteTask = (id)=>{
 setTasks(tasks.filter((task)=>task.id !== id));
}

const ontoggleReminder = (id)=>{
    setTasks(tasks.map((task)=>task.id === id ? 
    {...task,reminder : !task.reminder} : task));
}

  return (
    <Router>
    <div className="container">
      <Header onAdd = {()=>setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
      
      <Route path='/' 
      exact 
      render={(props)=>(
              <>
              {
            showAddTask && <AddTask  onAdd = {addTask} />
            }
            {tasks.length>0?
            <Tasks tasks ={tasks} onDelete = {deleteTask}  onToggle = {ontoggleReminder} />:"No Task to Show"
            }
              </>
            )
      } />

      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
