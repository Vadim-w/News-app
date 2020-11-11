import React, {ChangeEvent, KeyboardEvent} from "react";
import styles from "./Input.module.scss"

type InputTextTypeProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    actionEnter?: () => void;
    error?: boolean
    name?: string
    placeholder?: string
    type: string

}

export const Input = (props: InputTextTypeProps) => {
    const actionEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && props.actionEnter) {
            props.actionEnter();
        }
    }
    return (
        <>
            <input className={`${styles.inputText} ${props.error && props.value !== '' ? styles.error : ''}`}
                   type={props.type}
                   value={props.value}
                   onChange={props.onChange}
                   onKeyPress={actionEnter}
                   name={props.name}
                   placeholder={props.placeholder}
            />
        </>
    );
}