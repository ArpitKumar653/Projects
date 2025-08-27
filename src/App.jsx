import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  const savetoLS=()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }

  useEffect(() => {
    let todos=JSON.parse(localStorage.getItem('todos'))  
    setTodos(todos)
  }, [])
  

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo('')
    savetoLS()
  }
  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
     let newTodo=todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodo)
    savetoLS()
  }
  const handleDelete=(e,id)=>{
    console.log(e,id)
      let newTodo=todos.filter(item=>{
      return item.id!=id
    })
    setTodos(newTodo)
    savetoLS()
  }
  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  const handleCheck=(e)=>{
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id === id
    })
    let newTodo=[...todos]
    newTodo[index].isCompleted=!newTodo[index].isCompleted
    setTodos(newTodo)
    savetoLS()
  }
  const toogleFinished=()=>{
    setshowFinished(!showFinished)
  }
  return (
    <>
      <Navbar/>
      <div className="rounded-2xl bg-gray-200 mx-auto min-h-[80vh] w-5/12">
      <div className="addtodo p-5 my-5">
          <h1 className='text-2xl'>Add a todo</h1>
        <input onChange={handleChange} value={todo} type="text" className='bg-white rounded-2xl px-2 mt-2 w-10/12 h-8'/>
      <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-900 rounded-2xl mx-2 p-1 px-3 text-white font-bold  hover:bg-violet-800 disabled:bg-violet-600'>Add</button>
      </div>
          <input onClick={toogleFinished} type="checkbox" className='m-5' checked={showFinished} /> Show Todos
          <div className="Todos px-4 font-bold text-2xl flex">Your's Todos</div>
          {todos.length ===0 && <div className="mx-5">No Todos To Display</div> }
          {todos.map(item=>{
           return (showFinished || !item.isCompleted) && <div key={item.id} className="Todos flex px-5 items-center w-9/12 justify-between">
            <input name={item.id} onChange={handleCheck} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":'break-all mx-2'}>{item.todo}</div>
        
        <div className="buttons m-5 flex">
          <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-900 rounded-2xl mx-2 p-1 px-3 text-white font-bold hover:bg-violet-800 '>Edit</button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-900 rounded-2xl mx-2 p-1 px-3 text-white font-bold hover:bg-violet-800'>Delete</button>
        </div>
        </div>
        })}

      </div>
    </>
  )
}

export default App
