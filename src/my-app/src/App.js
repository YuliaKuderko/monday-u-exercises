import './App.css';
import React from 'react';
// import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';


function App() {
  return (
    <div className="container">
      <header>
        <h1>Just Do It</h1>
      </header>
      <TodoList/> 
    </div>
  );
}

export default App;
