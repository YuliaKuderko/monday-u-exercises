import React, { useEffect} from 'react';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';
import logo from './list_gif.gif';
import { connect } from 'react-redux';
import { getTodos, clearAllTodos } from '../redux/actions/items-entities-actions';

function TodoList(props) {

    useEffect(()=>{
        props.getTodos();
    },[]);

    return (
        <div className='all-task-container'>
            <NewTodo />
            <TodoItem todos={props.todos} fetchTodos={props.getTodos} />
            <img id="list-gif" src={logo} style={{ display: (props.todos.length > 0) ? 'none' : 'block' }} alt="list" height="200px" width="200px"></img>
            <h2 className='completed-tasks' style={{ display: (props.todos.length > 0) ? 'block' : 'none' }}>You have completed {props.todos.filter(e => e.status).length} / {props.todos.length} tasks</h2>
            <div className="btn-holder">
                <button className="clear-all" id="clear-all" onClick={props.clearAllTodos}>Clear All</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        todos: state.itemsEntities.todos,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTodos: () => dispatch(getTodos()),
    clearAllTodos: () => dispatch(clearAllTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

