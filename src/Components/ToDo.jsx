import { useEffect, useState } from 'react'
import supabase from '../../supabase-client'

import Card from './ToDoCard'
import Btn from "./Button"

import '../App.css'

function ToDo() {

  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    const {data, error} = await supabase
      .from("TodoList")
      .select("*")
      .eq("user_id", user.id)

    if (error){
      console.log('error fetching todos', error)
    }
    else {
      console.log('todos fetched', data)
      setTodoList(data)
    }

  }

  const addTodo = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    const newTodoData = {
      name: newTodo,
      isCompleted: false,
      user_id: user.id,
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
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('TodoList')
      .update({ isCompleted: !isComlete })
      .eq("id",id)
      .eq("user_id", user.id)
    
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
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('TodoList')
      .delete()
      .eq("id", id)
      .ep("user_id", user.id)
    
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
        <div className='flex flex-col justify-center p-1 w-2/3 min-h-100 mt-25 shadow-lg rounded-lg bg-neutral-800'>

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
        </ul>
        </div>
      </div>
    </>
  )
}

export default ToDo
