import React, { useState, useRef, useEffect } from 'react'
import './TaskManager.css'
import Task from './Task'

const TaskManager = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [tasks, setTasks] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name && !date || !name || !date) {
            alert("please enter task name & Date")
        } else {
            const newTask = {
                id: Date.now(),
                name,
                date,
                complete: true
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
                            <label htmlFor="name">Task:</label>
                            <input
                                type="date"
                                placeholder='Task Name'
                                name='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <button type='submit' className="--btn --btn-success --btn-block">Save Task</button>
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
                            {tasks.map((item) => {
                                return <Task
                                    {...item}
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