import {combineReducers, createStore } from "redux";
import {appReducer} from "../app/app-reducer";
import {newsReducer} from "../features/news/news-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    news: newsReducer
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer> ;

// @ts-ignore
window.store = store;