// import { format } from 'mysql2';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import {AiFillPlusSquare} from 'react-icons/ai';
import RemoteItemManager from '../remote-item-manager';



function NewTodo({onAdd}) {
    const [input, setInput] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    })

    const handleChange = e => {
      setInput(e.target.value);
    }
    
    const handleSubmit = e => {
      e.preventDefault();
      setInput('');
      onAdd(input);
    }

  return (
    <form onSubmit={handleSubmit}>
      <input className='new-task' type="text" placeholder="Add your new todo" 
       value={input} name="text" onChange={handleChange} ref={inputRef} required/>
      <button className='submitButton' type="submit" ><AiFillPlusSquare/></button>
    </form>    
  )
}

NewTodo.propTypes = {
  onAdd: PropTypes.func
};

export default NewTodo;