export const TaskReducer = (state, action) => {
    if (action.type === "EMPTY_FIELD") {
        return {
            ...state,
            isAlertOpen: true,
            alertContent: "Please Enter Name & Date",
            alertClass: "danger"
        }
    }
    if (action.type === "CLOSE_ALERT") {
        return {
            ...state,
            isAlertOpen: false
        }
    }
    if (action.type === "ADD_TASK") {
        const allTasks = [...state.tasks, action.payload]
        return {
            ...state,
            tasks: allTasks,
            isAlertOpen: true,
            alertContent: "Task Added Successfully",
            alertClass: "success"

        }
    }
    if (action.type === "OPEN_EDIT_MODAL") {
        return {
            ...state,
            taskId: action.payload,
            isEditModalOpen: true,
            modalTitle: "Edit Task",
            modalMsg: "You are about to Edit Task",
            modalActionText: "Edit"
        }
    }
    if (action.type === "EDIT_TASK") {
        return {
            ...state,
            isEditing: true,
        }
    }
    if (action.type === "CLOSE_MODAL") {
        return {
            ...state,
            isEditModalOpen: false,
            isDeleteModalOpen: false
        }
    }
    if (action.type === "UPDATE_TASK") {
        const updatedTask = action.payload
        const id = action.payload.id

        // find the task index
        const taskIndex = state.tasks.findIndex((task) => {
            return task.id === id
        });
        // replace the task by its index
        if (taskIndex !== -1) {
            state.tasks[taskIndex] = updatedTask
        }
        return {
            ...state,
            isEditing: false,
            isAlertOpen: true,
            alertContent: "Task Edited Successfully",
            alertClass: "success"

        }
    }
    if (action.type === "OPEN_DELETE_MODAL") {
        return {
            ...state,
            taskId: action.payload,
            isDeleteModalOpen: true,
            modalTitle: "Delete Task",
            modalMsg: " are you sure to Delete Task",
            modalActionText: "Delete"

        }
    }
    if (action.type === "DELETE_TASK") {
        const id = action.payload;
        const newTasks = state.tasks.filter((task) => task.id !== id)
        return {
            ...state,
            tasks: newTasks,
            isDeleteModalOpen: false,
            isAlertOpen: true,
            alertContent: "Task Deleted Successfully",
            alertClass: "success",
        }
    }
    if (action.type === "COMPLETE_TASK") {
        const id = action.payload;
        const taskIndex = state.tasks.findIndex((task) => {
            return task.id === id;
        });
        let updateTask = {
            id,
            name: state.tasks[taskIndex].name,
            date: state.tasks[taskIndex].date,
            complete: true,
        };
        if (taskIndex !== -1) {
            state.tasks[taskIndex] = updateTask;
        }
        return {
            ...state,
            isAlertOpen: true,
            alertContent: "Task Completed",
            alertClass: "success"

        }
    }
    return state;

}