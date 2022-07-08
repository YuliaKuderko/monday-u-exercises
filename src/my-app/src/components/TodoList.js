import React, { useEffect, useMemo, useState } from 'react';
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


    const addTodo = async (todo) => {
        await remoteItemManager.add(todo);
        fetchTodos();
    }


    const removeTodo = async (id) => {
        await remoteItemManager.deleteItem(id);
        fetchTodos();
    }

    const clearAllTodo = async () => {
        await remoteItemManager.clearAll();
        fetchTodos();
    }

    const doneTodo = async (id) => {
        await remoteItemManager.setDone(id);
        fetchTodos();
    }

    const unDoneTodo = async (id) => {
        await remoteItemManager.setUnDone(id);
        fetchTodos();
    }

    console.log("here", todos);
    return (
        <div className='all-task-container'>
            <NewTodo onAdd={addTodo} />
            <TodoItem todos={todos} doneTodo={doneTodo} unDoneTodo={unDoneTodo} removeTodo={removeTodo} />
            <img id="list-gif" src={logo} style={{display: (todos.length > 0) ? 'none' : 'block' }} alt="list" height="200px" width="200px"></img>
            <h2 className='completed-tasks' style={{display: (todos.length > 0) ? 'block' : 'none' }}>You have completed {todos.filter(e => e.status).length} / {todos.length} tasks</h2>
            <div className="btn-holder">
                <button className="clear-all" id="clear-all" onClick={clearAllTodo}>Clear All</button>
            </div>
        </div>
    )
}


export default TodoList;

