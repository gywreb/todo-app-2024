import { TodoItemStatus } from "@apis";

export interface ITodoItem {
    content: string;
    status: TodoItemStatus;
}

export interface ITodoContext {
    todoList: ITodoItem[];
    setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>
}