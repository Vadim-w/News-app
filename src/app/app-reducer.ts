
const initialState: initialStateType = {
    userType: 'guest',
    isAuthorization: false,
    userLogin: '',
    error: ''
}

export const appReducer = (state: initialStateType = initialState, action: ActionTypes):initialStateType => {
    switch (action.type) {
        case 'SET_USER_TYPE':
            return {...state, userType: action.userType}
        case 'SET_IS_AUTHORISATION':
            return {...state, isAuthorization: action.authorization}
        case 'SET_USER_LOGIN':
            return {...state, userLogin: action.userLogin}
        case 'SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actionCreators
export const setUserTypeAC = (userType: userTypes) => ({type: 'SET_USER_TYPE', userType} as const)
export const setIsAuthorizationAC = (authorization: boolean) => ({type: 'SET_IS_AUTHORISATION', authorization} as const)
export const setUserLoginAC = (userLogin: string) => ({type: 'SET_USER_LOGIN', userLogin} as const)
export const setErrorAC = (error: string) => ({type: 'SET_ERROR', error} as const)

//types
type initialStateType = {
    userType: userTypes
    isAuthorization: boolean
    userLogin: string
    error: string
}

type ActionTypes =
    | ReturnType<typeof setUserTypeAC>
    | ReturnType<typeof setIsAuthorizationAC>
    | ReturnType<typeof setUserLoginAC>
    | ReturnType<typeof setErrorAC>

export type userTypes = 'guest' | 'user' | 'admin'
