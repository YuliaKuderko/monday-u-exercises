import React, { useEffect, useState } from 'react';
import NewTodo from './NewTodo';
import RemoteItemManager from '../remote-item-manager.js';
import TodoItem from './TodoItem';
import logo from './list_gif.gif'

function TodoList() {
    const [todos, setTodos] = useState([]);
    const remoteItemManager = new RemoteItemManager();

    const fetchTodos = async () => {
        const items = await remoteItemManager.get();
        setTodos(items);
    }


    useEffect(() => {
        fetchTodos();
    },[])


    const clearAllTodo = async () => {
        await remoteItemManager.clearAll();
        fetchTodos();
    }


    console.log(todos);
    return (
        <div className='all-task-container'>
            <NewTodo fetchTodos={fetchTodos} />
            <TodoItem todos={todos} fetchTodos={fetchTodos} />
            <img id="list-gif" src={logo} style={{display: (todos.length > 0) ? 'none' : 'block' }} alt="list" height="200px" width="200px"></img>
            <h2 className='completed-tasks' style={{display: (todos.length > 0) ? 'block' : 'none' }}>You have completed {todos.filter(e => e.status).length} / {todos.length} tasks</h2>
            <div className="btn-holder">
                <button className="clear-all" id="clear-all" onClick={clearAllTodo}>Clear All</button>
            </div>
        </div>
    )
}


export default TodoList;

