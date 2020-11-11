import React from 'react';
import './App.css';
import {Route, BrowserRouter} from 'react-router-dom';
import {Navbar} from "./components/Navbar/Navbar";
import {Main} from "./features/main/Main";
import {News} from "./features/news/News";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <BrowserRouter>
            <Route exact path={"/"} render={() => <Main/>}/>
            <Route path={"/news"} render={() => <News/>}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
