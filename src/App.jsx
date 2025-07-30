import { useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import { useEffect } from 'react'
import TodoForm from './components/Todoform'
import TodoItem from './components/TodoItem'
import { ThemeProvider } from './context/ThemeContext'
import ThemeBtn from './components/ThemeBtn'


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const [theme, setTheme] = useState(() => {
    // Check localStorage for theme
    return localStorage.getItem("todoTheme") || "light"
  })

  useEffect(() => {
    // Apply theme to html tag
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)

    // Save theme to localStorage
    localStorage.setItem("todoTheme", theme)
  }, [theme])

  const lightTheme = () => setTheme("light")
  const darkTheme = () => setTheme("dark")



  return (
    <ThemeProvider value={{ theme, lightTheme, darkTheme }}>
      <TodoProvider value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}>
        <div className="bg-slate-400 dark:bg-[#000000] min-h-screen px-3 py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-white dark:bg-zinc-900">
            <div className='w-full mb-4 flex justify-between items-center'>
              <h1 className="text-2xl font-bold text-center mb-4 mt-2 dark:text-white text-black">Todo List</h1>
              <ThemeBtn />
            </div>
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App
