import React, {FC} from "react";
import styles from "./ButtonCommon.module.scss"

type ButtonPropsType = {
    value: string
    action: () => void
    mode?: 'red' | null
    type?: 'button' | 'submit' | 'reset' | undefined
    disabled?: boolean
}

export const ButtonCommon: FC<ButtonPropsType> = ({value, action, mode, type, disabled}) => {
    return (
        <button
            className={mode === 'red' ? `${styles.btn}  ${styles.error}` : styles.btn}
            onClick={action}
            type={type}
            disabled={disabled}>
            {value}
        </button>
    );
}