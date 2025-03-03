import { useEffect, useState } from 'react'
import supabase from '../../supabase-client'

import { motion, AnimatePresence } from 'motion/react'

import Card from '../Components/ToDoCard'
import Btn from "../Components/Button"

import '../App.css'

function ToDo() {

  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const {data, error} = await supabase
      .from("TodoList")
      .select("*")

    if (error){
      console.log('error fetching todos', error)
    }
    else {
      console.log('todos fetched', data)
      setTodoList(data)
      setLoading(false)
    }

  }

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false
    }

    if (!newTodo){
        alert("Please enter a task")
        return
    }

    const { data, error } = await supabase
      .from('TodoList')
      .insert([newTodoData])
      .single()

    if (error) {
      console.log('error adding todo', error)
    }
    else {
      console.log('todo added', newTodoData)
      setTodoList((prev) => [...prev, data])
      setNewTodo("")
      fetchTodos()
    }
  }


  const CompleteTask = async (id, isComlete) => {
    const { data, error } = await supabase
      .from('TodoList')
      .update({ isCompleted: !isComlete })
      .eq("id",id)
    
    if (error) {
      console.log('error toggling task', error)
    }
    else {
      console.log('task toggled')
      const updatedTodoList = todoList.map((todo) => todo.id == id ? {...todo, isCompleted: !isComlete} : todo)
      setTodoList(updatedTodoList)
    }
  }

  const DeleteTask = async (id) => {
    const { data, error } = await supabase
      .from('TodoList')
      .delete()
      .eq("id", id)
    
    if (error) {
      console.log('error deleting task', error)
    }
    else {
      console.log('task deleted')
      setTodoList((prev) => prev.filter((todo) => todo.id !== id))
    }
  }

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col justify-center p-1 w-2/3 min-h-100 shadow-lg rounded-lg bg-neutral-800'>

          <h1 className="text-5xl text-center">Todo List</h1>

          <div className='flex justify-center items-center'>
            <input
            type="text"
            className="m-2 outline-none border-2 border-gray-500 p-1 rounded-lg focus:border-blue-700"
            placeholder="What to do?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            />
            <Btn onClick={addTodo} className={" shadow-md shadow-black hover:shadow-lg hover:bg-white hover:text-black"}>Add Item</Btn>

          </div>

        <ul className='flex flex-wrap justify-center mt-5'>
        { loading ? (
            <h1 className="text-5xl text-center">Loading...</h1>
        ):(
        <>
        <AnimatePresence>

          {todoList.map((todo) => (
            todo && (
              <Card
                key={todo.id}
                todo={todo}
                CompleteTask={CompleteTask}
                DeleteTask={DeleteTask}
              />
            )
          ))}

        </AnimatePresence>
        </>
        )}
        </ul>
        </div>
      </div>
    </>
  )
}

export default ToDo