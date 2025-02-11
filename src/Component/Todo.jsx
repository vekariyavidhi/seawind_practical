
import React, { useState} from 'react';

const Todo = () => {
    const [input, setInput] = useState("");

    
    const [todos, setTodos] = useState(() => {
        const savedTodo = localStorage.getItem('todos');
        return savedTodo ? JSON.parse(savedTodo) : [];
    });

    
    const updateLocalStorage = (newTodos) => {
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
    };

   
    const handleChange = (e) => {
        setInput(e.target.value);
    };

   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input !== "") {
            const updatedTodos = [...todos, { text: input, completed: false }];
            setInput("");
            updateLocalStorage(updatedTodos);
        }
    };

   
    const toggleComplete = (index) => {
        const updatedTodos = todos.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        updateLocalStorage(updatedTodos);
    };

   
    const deleteClick =(i)=>{
                const deletetodo = todos.filter((_, data)=> data !== i )
               setTodos(deletetodo)
               LocalStorage(upadateTodo)
            }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Todo List!</h1>
                <h2>Pending Tasks: {todos.filter(task => !task.completed).length}</h2>
                <h2>Completed Tasks: {todos.filter(task => task.completed).length}</h2>

                <div>
                    <input
                        type='text'
                        placeholder='Enter Your Todo'
                        value={input}
                        onChange={handleChange}
                    />
                    <button type='submit'>Add</button>
                </div>

                <ul>
                    {todos?.map((task, i) => (
                        <li key={i}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleComplete(i)}
                            />
                            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.text}
                            </span>
                            <button onClick={() => deleteClick(i)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </form>
        </>
    );
};

export default Todo;
