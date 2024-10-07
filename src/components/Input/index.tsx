import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import styled from "styled-components";

interface InputProps {
    onAddTodo: (value: string) => void;
}

export interface InputRefProps {
    inputValue: string;
    forceUpdate: () => void;
}

const Input = forwardRef(({ onAddTodo }: InputProps, ref): JSX.Element => {
    const valueRef = useRef<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [, updateState] = useState<{}>();
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        valueRef.current = e.target.value;
    };

    const handleOnKeyPress = (e: React.KeyboardEvent) => {
        if(e.key === "Enter") {
            onAddTodo(valueRef.current);
        }
    };

    useImperativeHandle(ref, () => {
        return {
            inputValue: valueRef.current,
            forceUpdate: () => forceUpdate()
        }
    }, [valueRef.current])
    
    return <CustomerInput ref={inputRef} onChange={handleChange} onKeyDownCapture={handleOnKeyPress} />
});

const CustomerInput = styled.input`
    width: 100%;
    padding: 0.25rem;
`

export default Input;