import { createContext, useContext } from "react";
import { ITodoContext } from "../interface/todo";

export const TodoContext = createContext<ITodoContext>({
    todoList: [],
    setTodoList: () => {}
});

export const useTodoContext = () => useContext(TodoContext);