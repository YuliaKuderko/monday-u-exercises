import React from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import { deleteTodo, doneTodo, undoneTodo } from '../redux/actions/items-entities-actions.js';

function TodoItem({ todos, deleteTodo, doneTodo, undoneTodo }) {
    const alertMessage = (event) => {
        if ( event.target.className !== 'deleteButton' && event.target.className !== 'doneCheckbox') {
            alert(event.target.innerText);
        }
    }

    return todos.map((todo, index) => (
        <div className={todo.status ? 'li_done' : 'li'} key={index}>
               <div key={todo.id} onClick={alertMessage} id="task-list-item">
                <input type="checkbox" onClick={() => todo.status ? undoneTodo(todo.id) : doneTodo(todo.id)} checked={todo.status ? 'checked' : ''} className='doneCheckbox' />
                {todo.ItemName}
            </div> 
            <FaTrash onClick={() => deleteTodo(todo.id)} className="deleteButton" />
        </div>
    ))
}

TodoItem.propTypes = {
    todos: PropTypes.array,
    deleteTodo: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
      todos: state.itemsEntities.todos,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    doneTodo: (id) => dispatch(doneTodo(id)),
    undoneTodo: (id) => dispatch(undoneTodo(id)),
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);


