import React from 'react';
import { doneVisible, activeVisible, allVisible } from '../redux/actions/items-entities-actions';
import { connect } from 'react-redux';

function TodoHide(props) {
    return (
        <div className='hide-btns-holder'>
            <button className='done_tasks_btn' onClick={() => props.doneVisible()}>Done Tasks</button>
            <button className='active_tasks_btn' onClick={() => props.activeVisible()}>Active Tasks</button>
            <button className='all_tasks_btn' onClick={() => props.allVisible()}>All Tasks</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    doneVisible: () => dispatch(doneVisible()),
    activeVisible: () => dispatch(activeVisible()),
    allVisible: () => dispatch(allVisible())
});

export default connect(null, mapDispatchToProps)(TodoHide);