import React, { useState, useRef, useEffect, useReducer } from 'react';
import './TaskManager.css';
import Task from './Task';
import useLocalStorage from 'use-local-storage';
import Alert from '../alerts/Alert';
import Confirm from '../confirm/Confirm';
import { TaskReducer } from './TaskReducer';





const ReducerTaskManager = () => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [tasks, setTasks] = useLocalStorage("tasks", []);



    const initialState = {
        tasks,
        taskId: null,
        isEditing: false,
        isAlertOpen: false,
        alertContent: "This is an Alert",
        alertClass: "success",
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        modalTitle: "Delete Task",
        modalMsg: "You are about to delete this task..",
        modalActionText: "OK"
    }


    const [state, dispatch] = useReducer(TaskReducer, initialState)

    const onCloseAlert = () => {
        dispatch({
            type: "CLOSE_ALERT"
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !date) {
            dispatch({
                type: "EMPTY_FIELD"
            })
        }
        if (name && date && state.isEditing) {
            const UpdatedTask = {
                id: state.taskId,
                name,
                date,
                complete: false
            }
            dispatch({
                type: "UPDATE_TASK",
                payload: UpdatedTask
            })
            setName("")
            setDate("")
            setTasks(
                tasks.map((task) => {
                    if (task.id === UpdatedTask.id) {
                        return {
                            ...task,
                            name,
                            date,
                            complete: false
                        }
                    }
                    return task;
                })
            )
            return;
        }
        if (name && date) {
            const NewTask = {
                id: Date.now(),
                name,
                date,
                complete: false
            }
            dispatch({
                type: "ADD_TASK",
                payload: NewTask
            });
            setName("")
            setDate("")
            setTasks([...tasks, NewTask])
        }
    }
    const NameRef = useRef(null);

    useEffect(() => {
        NameRef.current.focus()
    }, [NameRef])

    const openEditModal = (id) => {
        dispatch({
            type: "OPEN_EDIT_MODAL",
            payload: id
        })
    }

    const onCloseModal = () => {
        dispatch({
            type: "CLOSE_MODAL"
        })
    }

    const modalAction = () => {
        const id = state.taskId
        dispatch({
            type: "EDIT_TASK",
            payload: id
        })
        const ThisTask = state.tasks.find((task) => task.id === id)
        setName(ThisTask.name)
        setDate(ThisTask.date)
        onCloseModal()
    }

    const openDeleteModal = (id) => {
        dispatch({
            type: "OPEN_DELETE_MODAL",
            payload: id
        })
    }
    // delete functionality
    const deleteTask = () => {
        const id = state.taskId
        dispatch({
            type: "DELETE_TASK",
            payload: id
        })
        const newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks);
    }
    // complete functionality
    const completeTask = (id) => {
        dispatch({
            type: "COMPLETE_TASK",
            payload: id
        })
        setTasks(
            tasks.map((task) => {
                if (task.id == id) {
                    return {
                        ...task,
                        complete: true
                    }
                }
                return task;
            })
        )

    }



    return (
        <div className='--bg-primary'>
            {state.isAlertOpen &&
                <Alert
                    alertContent={state.alertContent}
                    alertClass={state.alertClass}
                    onCloseAlert={onCloseAlert} />}

            {state.isEditModalOpen &&
                <Confirm
                    modalTitle={state.modalTitle}
                    modalMsg={state.modalMsg}
                    modalActionText={state.modalActionText}
                    modalAction={modalAction}
                    onCloseModal={onCloseModal}
                />}
            {state.isDeleteModalOpen &&
                (
                    <Confirm
                        modalTitle={state.modalTitle}
                        modalMsg={state.modalMsg}
                        modalActionText={state.modalActionText}
                        modalAction={deleteTask}
                        onCloseModal={onCloseModal}
                    />)}
            <h2 className='--text-center --text-light'>Task Manager Rducer</h2>
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
                        <button type='submit' className="--btn --btn-success --btn-block">{state.isEditing ? "Edit Task" : "Save Task"}</button>
                    </form>
                </div>
            </div>
            <article className='--flex-center --my2'>
                <div className="--width-500px --p">
                    <h2 className='--text-light'>Task List</h2>
                    <hr style={{ background: "#fff" }} />
                    {state.tasks.length === 0 ? (
                        <p className='--text-light'>No Task Added</p>
                    ) : (
                        <div>
                            {state.tasks.map((item, ind) => {
                                return <Task key={ind}
                                    {...item}
                                    editTask={openEditModal}
                                    deleteTask={openDeleteModal}
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

export default ReducerTaskManager