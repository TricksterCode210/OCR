import './App.css';
import { Link, Route, Routes} from 'react-router-dom'
import Information from './component/info/Information'
import React, {useState} from 'react'
import HomePage from './component/home/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultTable from './component/results/ResultTable'
import LoginPage from './component/login/LoginPage'
import RegisterPage from './component/register/RegisterPage'

function App() {
    return (
        <div className="App">
            <header>
                <nav className="nav">
                    <Link to={"/homePage"} className={"nav-item"}>Kezdőlap</Link>
                    <Link to={"/results"} className={"nav-item"}>Eredmények</Link>
                    <Link to={"/information"} className={"nav-item"}>Súgó</Link>
                    <Link to={"/"} className={"nav-item"}>Kijelentkezés</Link>
                </nav>
                <div className={"nav-cim"}>
                    <h3 className={"nav-cim-header"}>OCR Scanner</h3>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path={"/"} element={<LoginPage/>} />
                    <Route path={"/register"} element={<RegisterPage/>} />
                    <Route path={"/homePage"} element={<HomePage/>} />
                    <Route path={"/results"} element={<ResultTable/>} />
                    <Route path={"/information"} element={<Information/>} />
                </Routes>
            </main>
            <footer>
                <div className={"copyright"}>
                    <p>SZTE TTIK szakdolgozat, Dinnyés Dávid</p>
                </div>
            </footer>
        </div>
    )
}

export default App;
