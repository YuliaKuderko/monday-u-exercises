import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { AiFillPlusSquare } from 'react-icons/ai';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions/items-entities-actions';

function NewTodo(props) {

  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  })

  const handleChange = e => {
    setInput(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.addTodo(input)
    setInput('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className='new-task' type="text" placeholder="Add your new todo" value={input} name="text" onChange={handleChange} ref={inputRef} required />
      <button className='submitButton' type="submit" ><AiFillPlusSquare /></button>
    </form>
  )
}



const mapDispatchToProps = (dispatch) => ({
  addTodo: input => dispatch(addTodo(input))
})
export default connect(null, mapDispatchToProps)(NewTodo);