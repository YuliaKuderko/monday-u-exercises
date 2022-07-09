import React from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from "prop-types";
import RemoteItemManager from '../remote-item-manager.js';

function TodoItem({ todos, fetchTodos }) {
    const remoteItemManager = new RemoteItemManager();
    
    const alertMessage = (event) => {
        if ( event.target.className !== 'deleteButton' && event.target.className !== 'doneCheckbox') {
            alert(event.target.innerText);
        }
    }
    
    const doneTodo = async (id) => {
        await remoteItemManager.setDone(id);
        fetchTodos();
    }

    const unDoneTodo = async (id) => {
        await remoteItemManager.setUnDone(id);
        fetchTodos();
    }

    const removeTodo = async (id) => {
        await remoteItemManager.deleteItem(id);
        fetchTodos();
    }

    return todos.map((todo, index) => (
        <div className={todo.status ? 'li_done' : 'li'} key={index}>
               <div key={todo.id} onClick={alertMessage} id="task-list-item">
                <input type="checkbox" onClick={() => todo.status ? unDoneTodo(todo.id) : doneTodo(todo.id)} checked={todo.status ? 'checked' : ''} className='doneCheckbox' />
                {todo.ItemName}
            </div> 
            <FaTrash onClick={() => removeTodo(todo.id)} className="deleteButton" />
        </div>
    ))
}

TodoItem.propTypes = {
    todos: PropTypes.array,
    fetchTodos: PropTypes.func,
};

export default TodoItem;


