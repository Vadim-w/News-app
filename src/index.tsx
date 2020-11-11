import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    </HashRouter>,
    document.getElementById('root')
);

