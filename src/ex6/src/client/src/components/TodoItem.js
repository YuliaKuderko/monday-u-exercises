import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { deleteTodo, doneTodo, undoneTodo } from '../redux/actions/items-entities-actions.js';
//import loader from './loading_gif.gif';
function TodoItem(props) {
    //const [isLoading, setIsLoading] = useState(false);
    
    const alertMessage = (event) => {
        if (event.target.className !== 'deleteButton' && event.target.className !== 'doneCheckbox') {
            alert(event.target.innerText);
        }
    }
    // const onDeleteTodo = (async (id)=>{
    //     try {
    //         deleteTodo(id);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsLoading(true);
    //     }
    // })

    // const onDoneTodo = (async (id)=>{
    //     try {
    //         doneTodo(id);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsLoading(true);
    //     }
    // })

    // const onUndoneTodo = (async (id)=>{
    //     try {
    //         undoneTodo(id);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsLoading(true);
    //     }
    // })



    const showVisibility = (todo) => {
        if(props.visibleState === 'allVisible'){
            return true;
        }
        if(props.visibleState === 'doneVisible' && todo.status){
            return true;
        }
        if(props.visibleState === 'activeVisible' && !todo.status){
            return true;
        }
    }
    
    const filtered = props.todos.filter((todo)=>{
        if(!showVisibility(todo)){
            return false;
        }
        return true;
    });

    return filtered.map((todo, index) => (
        <div className={todo.status ? 'li_done' : 'li'} hidden={showVisibility(todo)} key={index}>
            <div key={todo.id} onClick={alertMessage} id="task-list-item">
                <input type="checkbox" onClick={() => todo.status ? props.undoneTodo(todo.id) : props.doneTodo(todo.id)} checked={todo.status ? 'checked' : ''} className='doneCheckbox' />
                {todo.ItemName}
            </div>
            <FaTrash onClick={() => props.deleteTodo(todo.id)} className="deleteButton" />
        </div>
    ))
}

TodoItem.propTypes = {
    todos: PropTypes.array,
    deleteTodo: PropTypes.func,
    doneTodo: PropTypes.func,
    undoneTodo: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        todos: state.itemsEntities.todos,
        visibleState: state.itemsView.visibleState
    };
};

const mapDispatchToProps = (dispatch) => ({
    doneTodo: (id) => dispatch(doneTodo(id)),
    undoneTodo: (id) => dispatch(undoneTodo(id)),
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);


