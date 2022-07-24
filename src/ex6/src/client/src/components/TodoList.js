import React, { useEffect, useState } from 'react';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';
import logo from './list_gif.gif';
import { connect } from 'react-redux';
import { getTodos, clearAllTodos } from '../redux/actions/items-entities-actions';
import TodoHide from './TodoHide';
import loader from './loading_gif.gif';

function TodoList(props) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try{
            props.getTodos();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(true);
        }
    }, []);


    return (
        <div className='all-task-container'>
            <NewTodo />
            <TodoItem todos={props.todos} fetchTodos={props.getTodos} isLoading={props.isLoading}/>
            {isLoading ? <img src={loader} alt="loading" height="200px" width="200px" /> : ''}
            <img id="list-gif" src={logo} style={{ display: (props.todos.length > 0) ? 'none' : 'block' }} alt="list" height="200px" width="200px"></img>
            <TodoHide />
            <h2 className='completed-tasks' style={{ display: (props.todos.length > 0) ? 'block' : 'none' }}>You have completed {props.todos.filter(e => e.status).length} / {props.todos.length} tasks</h2>
            <div className="btn-holder">
                <button className="clear-all" id="clear-all" onClick={props.clearAllTodos}>Clear All</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        todos: state.itemsEntities.todos
    };
};


const mapDispatchToProps = (dispatch) => ({
    getTodos: () => dispatch(getTodos()),
    clearAllTodos: () => dispatch(clearAllTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

