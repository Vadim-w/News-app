import React, {FC, useState} from "react";
import styles from "./Navbar.module.scss";
import {MenuItems} from "./MenuItems";
import {Button} from "../Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {setIsAuthorizationAC, setUserLoginAC, setUserTypeAC} from "../../app/app-reducer";
import {NavLink} from "react-router-dom";

type navBarPropsType = {
    openModalLogin: () => void
}


export const Navbar: FC<navBarPropsType> = ({openModalLogin}) => {
    const isAuthorization = useSelector<AppRootStateType, boolean>(state => state.app.isAuthorization)
    const [clicked, setClicked] = useState(false)
    const dispatch = useDispatch()

    const handleClick = () => {
        setClicked(!clicked)
    }
    const onLogOut = () => {
        dispatch(setIsAuthorizationAC(false))
        dispatch(setUserTypeAC('guest'))
        dispatch(setUserLoginAC(''))
    }

    return (
        <nav className={styles.NavbarItems}>
            <h1 className={styles.NavbarItems__logo}>News <i className={styles.NavbarItems__fabFaNews}></i></h1>
            <div className={styles.NavbarItems__menuIcon} onClick={handleClick}>
                <i className={clicked ? `fas fa-times ${styles.NavbarItems__faFaTimes}` : `fas fa-bars  ${styles.NavbarItems__faFaBars}`}></i>
            </div>
            <ul className={clicked ? styles.NavbarItems__navMenuActive : styles.NavbarItems__navMenu}>
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <NavLink to={item.url} className={styles.NavbarItems__NavLinks}>
                                {item.title}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            {isAuthorization ? <Button onClick={onLogOut}>Log out</Button> :
                <Button onClick={openModalLogin}>Log in</Button>}
        </nav>
    )
}

