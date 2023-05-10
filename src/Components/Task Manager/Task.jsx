import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaCheckDouble } from 'react-icons/fa'

const Task = (props) => {
    const { id, name, date, complete, editTask, deleteTask, completeTask } = props
    return (
        <div className={complete ? "task complete" : "task"} key={id}>

            <span>
                <p><b>Task:</b> {name}</p>
                <p><b>Date:</b> {date}</p>
            </span>

            <span>
                <button>
                    <FaEdit color="green" onClick={() => editTask(id)} />
                </button>
                <button>
                    <FaTrashAlt color="red" onClick={() => deleteTask(id)} />
                </button>
                <button>
                    <FaCheckDouble color="purple" onClick={() => completeTask(id)} />
                </button>
            </span>
        </div>
    )
}

export default Task