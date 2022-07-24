import RemoteItemManager from "../../remote-item-manager"

const remoteItemManager = new RemoteItemManager();

const getTodosAction = (todos) => ({
    type: "GET_TODOS",
    payload: todos
});

const addTodoAction = (todo) => ({
    type: "ADD_TODO",
    payload: todo
});

const deleteTodoAction = (id) => ({
    type: "DELETE_TODO",
    payload: id
});

const clearAllAction = () => ({
    type: "CLEAR_ALL_TODOS"
});

const doneTodosAction = (id) => ({
    type: "DONE_TODOS",
    payload: id
});

const undoneTodosAction = (id) => ({
    type: "UNDONE_TODOS",
    payload: id
});

const doneVisibleAction = () => ({
    type: "DONE_VISIBLE"
});

const activeVisibleAction = () => ({
    type: "ACTIVE_VISIBLE"
});

const allVisibleAction = () => ({
    type: "ALL_VISIBLE"
});

export const getTodos = () => {
    return async (dispatch) => {
        try {
            const todos = await remoteItemManager.get();
            dispatch(getTodosAction(todos));
        } catch (e) {
            throw new Error("Could not get tasks");
        }

    }
};

export const addTodo = (text) => {
    return async (dispatch) => {
        try {
            await remoteItemManager.add(text);
            const todo = await remoteItemManager.get();
            dispatch(addTodoAction(todo));
        } catch (e) {
            throw new Error("Could not add task");
        }

    }
};

export const deleteTodo = (id) => {
    return async (dispatch) => {
        try {
            await remoteItemManager.deleteItem(id);
            dispatch(deleteTodoAction(id));
        } catch (e) {
            throw new Error("Could not delete task");
        }
    }
};

export const clearAllTodos = () => {
    return async (dispatch) => {
        try {
            await remoteItemManager.clearAll();
            dispatch(clearAllAction());
        } catch (e) {
            throw new Error("Could not clear tasks");
        }
    }
};

export const doneTodo = (id) => {
    return async (dispatch) => {
        try {
            await remoteItemManager.setDone(id);
            dispatch(doneTodosAction(id));
        } catch (e) {
            throw new Error("Could not mark task as done");
        }
    }
};

export const undoneTodo = (id) => {
    return async (dispatch) => {
        try {
            await remoteItemManager.setUnDone(id);
            dispatch(undoneTodosAction(id));
        } catch (e) {
            throw new Error("Could not mark task as undone");
        }
    }
};

export const doneVisible = () => {
    return (dispatch) => {
        dispatch(doneVisibleAction());
        console.log("doneVisible")
    }
};

export const activeVisible = () => {
    return (dispatch) => {
        dispatch(activeVisibleAction());
        console.log("activeVisible")
    }
};

export const allVisible = () => {
    return (dispatch) => {
        dispatch(allVisibleAction());
        console.log("allVisible")
    }
};
