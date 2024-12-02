import { useEffect, useState } from 'react'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'
import ReactConfetti from 'react-confetti'; 

import "./styles.css"

import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import "./Calendar.css"

export default function App() {

  const [showConfetti, setShowConfetti] = useState(false); 

//todo items 
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue === null) return []
    return JSON.parse(localValue)
  })
  
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])


//add new todo
  function addTodo(todoName, dueDate, selectedTags) {
    if (!todoName || !dueDate) {
      alert('Please fill out both task name, due date');
      return;
    }
    setTodos(currentTodos => {
      return [...currentTodos,
        {id: Date.now(), 
         todoName, 
         dueDate, 
         tags: selectedTags, 
         completed: false},
      ]
    })
  }
//toggle todo complete
  function toggleTodo(id) {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    console.log("Updated Todos:", updatedTodos); // Log the updated todos to confirm changes
    setTodos(updatedTodos);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
//sort by due date
  function sortTasksByDueDate() {
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      if (sortOrder === 'asc') {
        return dateA - dateB; // Ascending order
      } else {
        return dateB - dateA; // Descending order
      }
    });
    setTodos(sortedTodos);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };
//select date on calendar
  const onDateChange = (date) => {
    setSelectedDate(date);
  };
//format date to be consistent
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredTodos = todos.filter(todo => formatDate(new Date(todo.dueDate)) === formatDate(selectedDate));

 //count todos for date 
 const countTodosForDate = (date) => {
  // Ensure dueDate is a Date object
  const count = todos.filter((todo) => {
    if (!todo.completed) {
      const todoDate = new Date(todo.dueDate); // Make sure it's a Date object
      return todoDate.toDateString() === date.toDateString(); // Compare dates
    }
  }).length;
  console.log(`Todo count for ${date.toDateString()}: ${count}`);
  return count;
};

// Function to highlight today's date
  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return "today"; // Apply 'today' class to today's date
      }
    }
    return "";
  };

//layout
  return (
  <div className="container">
    {showConfetti && <ReactConfetti />}
    <div className="top-section">

    {/* Left side: Task Form */}
    <div className="todo-form">
    <NewTodoForm onSubmit={addTodo}/>
  
      {/* Calendar Section */}
      <h1>Calendar</h1>
      <div className="calendar-section">
        <Calendar 
          className="responsive-calendar"
          locale="en-US"
          onChange={onDateChange}
          value={selectedDate}
          showNeighboringMonth={true}
          tileContent={({ date, view }) => {
            // Only display content on the month view
            if (view === "month") {
              const todoCount = countTodosForDate(date);
              if (todoCount > 0) {
                return <span className="todo-count">{todoCount}</span>;
              }
            }
            return null;
          }}
          tileClassName={getTileClassName} 
        />
      </div>
    </div>

    {/* Right side: Task List */}
    <div className="todo-list">
    <h1 className="header"> Todo List </h1>
    {filteredTodos.length > 0 ? (
    <TodoList todos={filteredTodos} sortOrder = {sortOrder} toggleTodo={toggleTodo} deleteTodo={deleteTodo} sortDate={sortTasksByDueDate}/>    
    ): (<TodoList todos={todos} sortOrder = {sortOrder} toggleTodo={toggleTodo} deleteTodo={deleteTodo} sortDate={sortTasksByDueDate}/>) }
    </div>
    </div>
  </div>
  )
}
