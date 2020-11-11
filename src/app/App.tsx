import React, {useState} from "react";
import "./App.module.css";
import {Route, Switch} from "react-router-dom";
import {Navbar} from "../components/Navbar/Navbar";
import {Main} from "../features/main/Main";
import {News} from "../features/news/News";
import {Modal} from "../components/Modal/Modal";
import {Input} from "../components/Input/Input";
import {useFormik} from "formik";
import {ButtonCommon} from "../components/ButtonCommon/ButtonCommon";
import {useDispatch, useSelector} from "react-redux";
import {setErrorAC, setIsAuthorizationAC, setUserLoginAC, setUserTypeAC} from "./app-reducer";
import {AppRootStateType} from "../store/store";
import styles from "./App.module.css"

function App() {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const error = useSelector<AppRootStateType, string>(state => state.app.error)
    const dispatch = useDispatch()

    const openModalLogin = () => {
        setIsModalOpened(true)
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },

        onSubmit: values => {
            if (values.login === 'Admin' && values.password === 'passwordAdmin') {
                dispatch(setUserTypeAC('admin'))
                dispatch(setIsAuthorizationAC(true))
                dispatch(setUserLoginAC(values.login))
                setIsModalOpened(false)
                dispatch(setErrorAC(''))
            } else if (values.login === 'User' && values.password === 'passwordUser') {
                dispatch(setUserTypeAC('user'))
                dispatch(setIsAuthorizationAC(true))
                dispatch(setUserLoginAC(values.login))
                setIsModalOpened(false)
                dispatch(setErrorAC(''))
            } else {
                dispatch(setErrorAC('Incorrect login or password'))
            }
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.login) {
                errors.login = 'Required';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors;
        },
    })

    return (
        <div className='App'>
            <Navbar openModalLogin={openModalLogin}/>
            <Switch>
                <Route exact path={'/'} render={() => <Main/>}/>
                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'*'} render={()=> <h1>404</h1>}/>
            </Switch>


            {isModalOpened &&
            <Modal title={'Log in'} onClose={() => {
                setIsModalOpened(false)
            }} duration={600} showCloseBtn>
                <div className={'styles.loginForm'}>
                    <form>
                        <Input placeholder={'Login'}
                               type={'text'}
                               {...formik.getFieldProps('login')}
                        />
                        {formik.errors.login && <div className={styles.spanError}>{formik.errors.login}</div>}
                        <Input placeholder={'Password'}
                               type={'password'}
                               {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && <div className={styles.spanError}>{formik.errors.password}</div>}
                        <div>
                            <ButtonCommon value={'login'} action={formik.handleSubmit}/>
                        </div>
                    </form>
                    {error && <span className={styles.spanError}>{error}</span>}
                </div>
            </Modal>
            }
        </div>
    );
}

type FormikErrorType = {
    login?: string
    password?: string
}

export default App;
