import React, {FC} from "react";
import styles from "./Post.module.scss";
import {ButtonCommon} from "../../../components/ButtonCommon/ButtonCommon";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {userTypes} from "../../../app/app-reducer";

type postPropsType = {
    postID: string
    title: string
    text: string
    date: string
    approved: boolean
    approvePost: (postID: string) => void
    deletePost: (postID: string) => void
}

export const Post: FC<postPropsType> = ({title, text, date, postID, approved, approvePost, deletePost}) => {

    const userType = useSelector<AppRootStateType, userTypes>(state => state.app.userType)

    return (
        <div className={styles.postBlock}>
            <h3 className={styles.postBlock__title}>{title}</h3>
            <p className={styles.postBlock__text}>{text}</p>
            <span className={styles.postBlock__date}>{date}</span>
            {(userType === 'admin' && !approved) && <div className={styles.postBlock__buttons}>
                <ButtonCommon value={'approve'} action={() => approvePost(postID)}/>
                <ButtonCommon value={'delete'} action={() => deletePost(postID)} mode={'red'}/>
            </div>}
        </div>
    )
}