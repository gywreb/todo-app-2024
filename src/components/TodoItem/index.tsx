
import styled from "styled-components";
import { ITodoItem } from "../../interface/todo";
import { TodoItemStatus } from "../../apis/todos";
import { useTodoContext } from "../../hooks/useTodoContext";

interface TodoItemProps extends ITodoItem {
    onChangeStatus: () => void;
    onDeleteItem: () => void;
}

const TodoItem = ({ content, status, onChangeStatus, onDeleteItem }: TodoItemProps): JSX.Element => {
    return <TodoItemContainer status={status} >
        <TodoItemContent>
            {content}
        </TodoItemContent>
        <span>{status === TodoItemStatus.DONE ? "Done" : "Inprogress"}</span>
        <div>
            <ButtonChangeStatus status={status} onClick={onChangeStatus}>
                {status === TodoItemStatus.DONE ? "TODO" : "DONE"}
            </ButtonChangeStatus>
            <ButtonDelete onClick={onDeleteItem}>
                DELETE
            </ButtonDelete>
        </div>
    </TodoItemContainer>;
}

const TodoItemContainer = styled.div<{ status: keyof typeof TodoItemStatus }>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: ${props => props.status === TodoItemStatus.DONE ? "#32CD32" : "transparent" };
    border: 1px solid #999;
    border-radius: 0.25rem;
    align-items: center;
    padding: 0 0.5rem;
`;

const TodoItemContent = styled.p`
    font-size: 1rem;
    font-weight: 600;
    color: #111;
`;

const ButtonChangeStatus = styled.button<{ status?: keyof typeof TodoItemStatus }>`
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: ${props => props.status === TodoItemStatus.DONE ? "yellow" : "green"};
    border: none;
    border-radius: 0.5rem;
    color:  ${props => props.status === TodoItemStatus.DONE ? "black" : "white"};;
`;

const ButtonDelete = styled(ButtonChangeStatus)`
    background-color: red;
    color: white;
`

export default TodoItem;