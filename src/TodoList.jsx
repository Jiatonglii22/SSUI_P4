import { TodoItem } from "./TodoItem"


export function TodoList({todos, sortOrder, toggleTodo, deleteTodo, sortDate}) {

    const activeTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);


    return (
    <div className="filter">
    {/* Button to sort tasks */}
    <button onClick={sortDate}>
        Sort by Due Date ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
    </button>
    <div className="list">
    {/* Active Tasks Section */}
    <div className="active-list">
        <h2>Active</h2>
        {todos.length === 0 && "No Todos"}
        {activeTodos.map(todo => {
      return (
        <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      )
    })}
    </div> 
    {/* Completed Tasks Section */}
    <div className="completed-list">
        <h2>Completed</h2>
        {todos.length === 0 && "No completed todos"}
        {completedTodos.map(todo => {
      return (
        <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      )
    })}
    </div> 
  </div>
  </div>
    )
}