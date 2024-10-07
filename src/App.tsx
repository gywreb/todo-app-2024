
import React, { createContext, useEffect, useRef, useState } from 'react';
import { getTodoList, TodoItemStatus } from './apis/todos';
import { ITodoContext, ITodoItem } from './interface/todo';
import TodoList from './components/TodoList';
import styled from 'styled-components';
import Input, { InputRefProps } from './components/Input';
import { TodoContext } from './hooks/useTodoContext';

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const inputRef = useRef<InputRefProps | null>(null);
  
  const fetchTodoList = async () => {
    try {
      setIsLoading(true);
      const data = await getTodoList();
      setTimeout(() => {
        setTodos(data);
        setIsLoading(false);
      }, 1000);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodoList();
  }, []);

  const handleAddTodo = (value: string) => {
      const newTodo: ITodoItem = {
        content: value,
        status: TodoItemStatus.TODO
      };
      setTodos((prev) => [
        ...prev, 
        newTodo
      ]);
  };

  return (
    <TodoContext.Provider value={{
      todoList: todos,
      setTodoList: setTodos
    }}>
      <AppContainer>
        <AppInputContainer>
          <Input ref={inputRef} onAddTodo={handleAddTodo} />
          <AppButton onClick={() => {
            inputRef.current?.forceUpdate();
            const value = inputRef.current?.inputValue;
            if(!!value) handleAddTodo(value);
          }}>Add</AppButton>
        </AppInputContainer>
        {isLoading && <p>Loading...</p>}
        {!!todos.length && !isLoading && <TodoList />}
      </AppContainer>
    </TodoContext.Provider> 
  );
};

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 2.5rem auto;
`;

const AppInputContainer = styled.div`
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const AppButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: green;
  border: none;
  border-radius: 0.5rem;
  color: white;
`

export default App;
