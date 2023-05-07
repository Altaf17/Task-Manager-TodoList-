import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaCheckDouble } from 'react-icons/fa'

const Task = (props) => {
    const { id, name, date, complete } = props
    return (
        <div className={complete ? "task complete" : "task"} key={id}>

            <span>
                <p><b>Task:</b> {name}</p>
                <p><b>Date:</b> {date}</p>
            </span>

            <span>
                <button>
                    <FaEdit color="green" />
                </button>
                <button>
                    <FaTrashAlt color="red" />
                </button>
                <button>
                    <FaCheckDouble color="green" />
                </button>
            </span>
        </div>
    )
}

export default Task