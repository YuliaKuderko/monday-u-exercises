import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import {AiFillPlusSquare} from 'react-icons/ai';
import RemoteItemManager from '../remote-item-manager.js';


function NewTodo({fetchTodos}) {
    const [input, setInput] = useState('');
    const remoteItemManager = new RemoteItemManager();

    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    })

    const handleChange = e => {
      setInput(e.target.value);
    }
    
    const handleSubmit =  async (e) => {
      e.preventDefault();
      setInput('');
      await remoteItemManager.add(input);
      fetchTodos();
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
  fetchTodos: PropTypes.func
};

export default NewTodo;