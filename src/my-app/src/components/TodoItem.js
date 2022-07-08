import React from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from "prop-types";

function TodoItem({ todos, doneTodo, unDoneTodo, removeTodo }) {

    const alertMessage = (event) => {
        if ( event.target.className !== 'deleteButton' && event.target.className !== 'doneCheckbox') {
            alert(event.target.innerText);
        }
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
    todos: PropTypes.string,
    doneTodo: PropTypes.func,
    unDoneTodo: PropTypes.func,
    removeTodo: PropTypes.func
};

export default TodoItem;


