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

export const getTodos = () => {
    return async (dispatch) => {
        const todos = await remoteItemManager.get();
        dispatch(getTodosAction(todos));
    }
}

export const addTodo = (text) => {
    return async (dispatch) => {
        await remoteItemManager.add(text);
        const todo = await remoteItemManager.get();
        dispatch(addTodoAction(todo));
    }
}

export const deleteTodo = (id) => {
    return async (dispatch) => {
        await remoteItemManager.deleteItem(id);
        dispatch(deleteTodoAction(id));
    }
}

export const clearAllTodos = () => {
    return async (dispatch) => {
        await remoteItemManager.clearAll();
        dispatch(clearAllAction());
    }
}

export const doneTodo = (id) => {
    return async (dispatch) => {
        await remoteItemManager.setDone(id)
        dispatch(doneTodosAction(id))
    }
}

export const undoneTodo = (id) => {
    return async (dispatch) => {
        await remoteItemManager.setUnDone(id)
        dispatch(undoneTodosAction(id))
    }
}
