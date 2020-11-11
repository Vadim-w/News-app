import {v1} from "uuid";

const initialState: initialStateType = {
    news: [
        {
            id: v1(),
            title: 'Пост о погоде 1',
            text: 'сегодня на улице прохладно',
            date: 'Nov 11, 2020 3:21 PM',
            approved: false
        },
        {
            id: v1(),
            title: 'Новость о погоде 2',
            text: 'сегодня на улице тепло',
            date: 'Nov 11, 2020 3:00 PM',
            approved: false
        },
        {
            id: v1(),
            title: 'Новость 1',
            text: 'сегодня на улице жарко',
            date: 'Nov 11, 2020 2:25 PM',
            approved: true
        },
        {
            id: v1(),
            title: 'Новость 2',
            text: 'сегодня на улице ветренно',
            date: 'Nov 11, 2020 2:00 PM',
            approved: false
        },
        {
            id: v1(),
            title: 'Новость 3',
            text: 'сегодня на улице пасмурно',
            date: 'Nov 11, 2020 1:59 PM',
            approved: true
        },
        {
            id: v1(),
            title: 'Новость 4',
            text: 'сегодня на улице ясно',
            date: 'Nov 11, 2020 1:32 PM',
            approved: false
        },
    ]
}


export const newsReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'DELETE_POST':
            return {...state, news: state.news.filter((p) => p.id !== action.postID)}
        case 'ADD_POST':
            return {...state, news: [action.post, ...state.news]}
        case 'APPROVE_POST':
              return  { ...state,
                news: state.news.map((p) => {
                    if (p.id === action.postID) {
                        return {...p, approved: true}
                    } else {
                        return p
                    }
                })}
        default:
            return state
    }
}

//actionCreators
export const addPostAC = (post: postType) => ({type: 'ADD_POST', post} as const)
export const approvePostAC = (postID: string) => ({type: 'APPROVE_POST', postID} as const)
export const deletePostAC = (postID: string) => ({type: 'DELETE_POST', postID} as const)

//types
type initialStateType = {
    news: Array<postType>
}

type ActionTypes =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof approvePostAC>
    | ReturnType<typeof deletePostAC>

export type postType = {
    id: string
    title: string
    text: string
    date: string
    approved: boolean
}