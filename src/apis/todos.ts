import { ITodoItem } from "../interface/todo";

export enum TodoItemStatus {
    TODO = "TODO",
    DONE = "DONE"
};

const mockTodoList: ITodoItem[] = [
    {
        content: "Item 1",
        status: "TODO"
    },
    {
        content: "Item 2",
        status: "TODO"
    },
    {
        content: "Item 3",
        status: "TODO"
    },
]

export const getTodoList = (): Promise<ITodoItem[]> => {
    return new Promise((resolve, _) => {
        resolve(mockTodoList);
    })
}

