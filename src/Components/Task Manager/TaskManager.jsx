import React, { useState, useRef, useEffect } from 'react';
import './TaskManager.css';
import Task from './Task';
import useLocalStorage from 'use-local-storage';

const TaskManager = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    // const [tasks, setTasks] = useState([]);
    const [tasks, setTasks] = useLocalStorage("tasks",[]);

    const [taskId, setTaskId] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name && !date || !name || !date) {
            alert("please enter task name & Date")
        }
        // edit functionality
        else if (name && date && isEditing) {
            setTasks(
                tasks.map((task) => {
                    if (task.id === taskId) {
                        return { ...tasks, name, date, complete: false }
                    }
                    return task;
                })
            )
            setName("")
            setDate("")
            setIsEditing(false)
            setTaskId(null)
        }
        else {
            const newTask = {
                id: Date.now(),
                name,
                date,
                complete: false
            }
            setTasks([...tasks, newTask])
            setName("")
            setDate("")
        }


    }
    const NameRef = useRef(null);

    useEffect(() => {
        NameRef.current.focus()
    }, [])
    // edit functionality
    const editTask = (id) => {
        const thisTask = tasks.find((task) => task.id === id);
        setIsEditing(true);
        setTaskId(id);
        setName(thisTask.name)
        setDate(thisTask.date)
    }
    // delete functionality
    const deleteTask = (id) => {
        if (window.confirm("Delete This Task") === true) {
            const newTask = tasks.filter((task) => task.id !== id)
            setTasks(newTask)
        }
    }
    // complete functionality
    const completeTask = (id) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, complete: true }
                }
                return task;
            })
        )
    }

    return (
        <div className='--bg-primary'>
            <h1 className='--text-center --text-light'>Task Manager</h1>
            <div className="--flex-center --p">
                <div className="--card --bg-light --width-500px --p --flex-center">
                    <form className='form --form-control' onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="name">Task:</label>
                            <input
                                type="text"
                                placeholder='Task Name'
                                name='name'
                                value={name}
                                ref={NameRef}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="">
                            <label htmlFor="name">Date:</label>
                            <input
                                type="date"
                                placeholder='Task Name'
                                name='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <button type='submit' className="--btn --btn-success --btn-block">{isEditing ? "Edit Task" : "Save Task"}</button>
                    </form>
                </div>
            </div>
            <article className='--flex-center --my2'>
                <div className="--width-500px --p">
                    <h2 className='--text-light'>Task List</h2>
                    <hr style={{ background: "#fff" }} />
                    {tasks.length === 0 ? (
                        <p className='--text-light'>No Task Added</p>
                    ) : (
                        <div>
                            {tasks.map((item ,ind) => {
                                return <Task key={ind}
                                    {...item}
                                    editTask={editTask}
                                    deleteTask={deleteTask}
                                    completeTask={completeTask}
                                />
                            })}
                        </div>

                    )}
                </div>
            </article>
        </div>
    )
}

export default TaskManager