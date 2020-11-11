import React, {FC, ReactNode} from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
    children: ReactNode
    onClick: () => void
}

export const Button: FC<ButtonProps> = ({children, onClick}) => {
    return (
        <button className={styles.btn} onClick={onClick}>
            {children}
        </button>
    )
}