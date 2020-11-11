import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import styles from "./News.module.scss";
import {Input} from "../../components/Input/Input";
import {ButtonCommon} from "../../components/ButtonCommon/ButtonCommon";
import {useFormik} from "formik";
import {Post} from "./post/Post";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {addPostAC, approvePostAC, deletePostAC, postType} from "./news-reducer";
import {userTypes} from "../../app/app-reducer";
import {v1} from "uuid";
import moment from 'moment';


export const News = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            text: ''
        },

        onSubmit: values => {
            let post: postType = {
                id: v1(),
                title: values.title,
                text: values.text,
                approved: false,
                date: moment().format('lll')
            }
            dispatch(addPostAC(post))
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.title) {
                errors.title = 'Required';
            }
            if (!values.text) {
                errors.text = 'Required';
            }
            return errors;
        },
    })

    const dispatch = useDispatch()
    let news = useSelector<AppRootStateType, Array<postType>>(state => state.news.news)
    const userType = useSelector<AppRootStateType, userTypes>(state => state.app.userType)

    const [cNews, setCNews] = useState(news)
    const [valueSearch, setValueSearch] = useState('')

    useEffect( ()=> {
        setCNews(news)
    }, [news, userType] )


    const approvePost = useCallback((postID: string) => {
        dispatch(approvePostAC(postID))
    }, [])
    const deletePost = (postID: string) => {
        dispatch(deletePostAC(postID))
    }


    if(userType === 'guest') {
        news = news.filter((p) => p.approved)
    }

    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        let searchValue = (e.currentTarget.value).toLowerCase()
        setValueSearch(searchValue)

        let copiedNews = news.filter((p) => {
            return p.title.toLowerCase().indexOf(searchValue) > -1
        })
        setCNews(copiedNews)
    }

    return (
        <div>
            <h2 className={styles.title}>News</h2>
            <div>
                <Input
                    placeholder={'search news'}
                    value={valueSearch}
                    onChange={searchInputHandler}
                    type={'text'}
                />
            </div>
            { userType === 'user' && <div className={styles.formBlock}>
                <form>
                    <Input placeholder={'title'}
                           type={'text-area'}
                           {...formik.getFieldProps('title')}
                    />
                    {formik.errors.title && <div className={styles.formBlock__errorInput}>{formik.errors.title}</div>}
                    <Input placeholder={'text'}
                           type={'text'}
                           {...formik.getFieldProps('text')}
                    />
                    {formik.errors.text && <div className={styles.formBlock__errorInput}>{formik.errors.text}</div>}
                    <div className={styles.formBlock__buttonSubmit}>
                        <ButtonCommon disabled={false} type='submit' value='add news' action={formik.handleSubmit}/>
                    </div>
                </form>
            </div>}
            <div className={styles.newsBlock}>
                {cNews.map((post) => {
                   return <Post
                       key={post.id}
                       postID={post.id}
                       title={post.title}
                       text={post.text}
                       date={post.date}
                       approved={post.approved}
                       approvePost={approvePost}
                       deletePost={deletePost}
                   />
                })}
            </div>
        </div>
    )
}

type FormikErrorType = {
    title?: string
    text?: string
}