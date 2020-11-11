import React from "react";
import styles from "./Main.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

export const Main = () => {
    const isAuthorization = useSelector<AppRootStateType, boolean>(state => state.app.isAuthorization)
    const userLogin = useSelector<AppRootStateType, string>(state => state.app.userLogin)

    return (
        <div className={styles.greetingBlock}>
            <h2> {isAuthorization ? `Привет, ${userLogin}!` : 'Привет, Гость!'}</h2>
        </div>
    )
}