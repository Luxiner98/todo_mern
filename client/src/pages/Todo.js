import React, { useState, useContext, useEffect } from 'react'
import {userDataContext} from '../App';
import { v4 as uuidv4 } from "uuid";
import { useHistory } from 'react-router-dom';

export default function Todo() {
    const [todos,setTodos] = useState([]);
    const [todoInput,setTodoInput] = useState('');
    const [userData,setUserData] = useContext(userDataContext);
    const [show,setShow] = useState('all');

    const history = useHistory();

    const today = new Date();
    let date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

    const saveTodos = (newTodos) =>{
        fetch('http://localhost:3001/todo',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`${userData.username}:${userData.password}`
            },
            body:JSON.stringify(newTodos)
        })
        .then(()=>{});
    }

    useEffect(() => {
        fetch(`http://localhost:3001/todo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userData.username}:${userData.password}`,
          },
        })
        .then((response) => response.json())
        .then((todos) => setTodos(todos));  
      },[]);

    const addTodo = (e) =>{
        e.preventDefault();
        if(!todoInput) return;
        setTodos([...todos,{id: uuidv4(),checked:false,text:todoInput,date:date}]);
        setTodoInput('');
        saveTodos([...todos,{id: uuidv4(),checked:false,text:todoInput,date:date}]);
    }

    const isChecked = id=>{
        const newTodos = [...todos];
        const todoItem = newTodos.find((todo) => todo.id === id);
        todoItem.checked = !todoItem.checked;
        setTodos(newTodos);
        saveTodos(newTodos);
    }

    const deleteTodo = (id) => {
        const newTodos = todos.filter(todoId=>todoId.id!==id);
        setTodos(newTodos);
        saveTodos(newTodos);
    }

    const getTodos = () =>{
        if(show==='all'){
            return todos;
        }else if(show==='checked'){
            return todos.filter(todo=>todo.checked);
        }else{
            return todos.filter(todo=>!todo.checked);;
        }
    }

    const showSelected = (e) =>{
        setShow(e);
    }

    const logout = () =>{
        history.goBack();
        setUserData(null);
    }

    return (
        <div>
            <div className='logout'>
                <button onClick={logout}>Log out</button>
            </div>
            <form onSubmit={addTodo} className='todo-form'>
                <input
                    className='todo-input'
                    value={todoInput}
                    onChange={(e)=>setTodoInput(e.target.value)}
                    type='text' 
                />
                <button type='submit' className='todo-button'>ADD</button>
                <div className='select'>
                    <select value={show} onChange={(e)=>showSelected(e.target.value)} className='filter-todo'>
                        <option value="all">All</option>
                        <option value="checked">Checked</option>
                        <option value="unchecked">Unchecked</option>
                    </select>
                </div>
            </form>
            <div className='todo-container'>
                <div className='todo-list'>
                    {getTodos().map((todo)=>(
                        <div key={todo.id} className='todo'>
                            <p><i>Created: {todo.date}</i></p>
                            <label className='todo-item'>{todo.text}</label>
                            <button onClick={()=>deleteTodo(todo.id)} className='delete-btn'>DELETE</button>
                            <input
                                className='checked-btn'
                                checked={todo.checked}
                                onChange={()=>isChecked(todo.id)} 
                                type='checkbox'                         
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
