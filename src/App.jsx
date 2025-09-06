  import { useEffect, useState } from 'react'
  import './App.css'
  import Navigation from './Component/Navigation'
  import { FaEdit } from "react-icons/fa";
  import { MdDeleteForever } from "react-icons/md";
  function App() {

    const[task,setTask] = useState("");
    const[todo,setTodo] = useState([]);

    useEffect(() => {
    let todo = JSON.parse(localStorage.getItem("todo"))
    setTodo(todo)
},[])

    const saveToLs = () =>{
      localStorage.setItem("todo",JSON.stringify(todo))
    }

    const handleAdd = () =>{
      setTodo([...todo,{task, iscompleted:false}])
      setTask("");
      saveToLs();
    }

    const handleDelete = (index) =>{
      let newTodos = todo.filter((_,i) =>i !== index)
      setTodo(newTodos);
      saveToLs();
    }

    const handleEdit = (index) =>{
      let editItem = todo.find((_, i) => i === index); 
  if (editItem) {
    setTask(editItem.task); 
    let newTodos = todo.filter((_, i) => i !== index); 
    setTodo(newTodos); 
    saveToLs();
  }
  
    };

    const handleChange = (e) =>{
      setTask(e.target.value);
    }
    const handleToggle = (index) =>{
      const updatedTodos = [...todo];
    updatedTodos[index].iscompleted = !updatedTodos[index].iscompleted;
    setTodo(updatedTodos);
    }

    return (
      <>
      <Navigation/>
      <div className="md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2 ">
        <div className="addTask my-5 text-center">
          <h1 className="text-xl font-bold">Add Task</h1>
          <input onChange={handleChange} value={task} type="text" className="w-1/2 border-2 rounded-md"/>
          <button onClick={handleAdd} disabled={task.length<=3} className="bg-violet-800 hover:hover:bg-fuchsia-700 disabled:bg-violet-700 p-7 py-1 text-lg font-bold text-white rounded-md mx-6">Add</button>
        </div>
        <div className='h-[1px] bg-black opacity-50 w-[90%] mx-auto my-2'></div>
        <h1 className="text-xl text-center font-bold">Your Task</h1>
        <div className="Tasks">
          {todo.length === 0 && <div className='m-5'>No Task</div>}
          {todo.map((item,index)=>{
          return <div key={index} className="Task flex  my-3 justify-between">
           <div className="flex"> <input type="checkbox" checked={item.iscompleted} onChange={() => handleToggle(index)} className="mr-2"/>
            <div className={item.iscompleted?"line-through":""}>{item.task}</div>
            </div>
            <div className="buttons flex  h-full">
              <button onClick={() => handleEdit(index)} className="bg-blue-800 hover:hover:bg-indigo-900 p-7 h-8 py-1 text-lg font-bold text-white rounded-md mx-2"><FaEdit /></button>
              <button onClick={() => handleDelete(index)} className="bg-blue-800 hover:hover:bg-indigo-900 p-7 h-8 py-1 text-lg font-bold text-white rounded-md mx-2"><MdDeleteForever /></button>
            </div>
          </div>
          })}
        </div>
      </div>
      </>
    )
  }

  export default App
