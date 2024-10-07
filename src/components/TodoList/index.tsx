
import styled from "styled-components";
import { ITodoItem } from "../../interface/todo";
import TodoItem from "../TodoItem";
import { useTodoContext } from "../../hooks/useTodoContext";
import { TodoItemStatus } from "../../apis/todos";

const TodoList = (): JSX.Element => {
    const { todoList, setTodoList } = useTodoContext();

    const handleChangeItemStatus = (idx: number) => {
        let foundItem = todoList.find((_, index) => index === idx);
        if(!!foundItem) {
            foundItem = {
                ...foundItem,
                status: foundItem.status === TodoItemStatus.DONE ? TodoItemStatus.TODO : TodoItemStatus.DONE
            };
            setTodoList((prev) => [
                ...prev.slice(0, idx),
                {...foundItem!},
                ...prev.slice(idx + 1)
            ])
        }
    };

    const handleDeleteItem = (idx: number) => {
        let foundItem = todoList.find((_, index) => index === idx);
        if(!!foundItem) {
            setTodoList((prev) => [
                ...prev.slice(0, idx),
                ...prev.slice(idx + 1)
            ])
        }
    };

    return <TodoListContainer>
        {todoList.map((item, index) => <TodoItem 
                { ...item} 
                key={`${item.content}#${index}`} 
                onChangeStatus={() => handleChangeItemStatus(index)}
                onDeleteItem={() => handleDeleteItem(index)}
            />
        )}
    </TodoListContainer>;
}

const TodoListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`

export default TodoList;