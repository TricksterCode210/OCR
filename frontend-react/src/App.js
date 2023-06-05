import './App.css';
import { Link, Route, Routes} from 'react-router-dom'
import Information from './component/info/Information'
import React, {useState} from 'react'
import HomePage from './component/home/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <header>
                <nav className="nav">
                    <Link to={"/"} className={"nav-item"}>Kezdőlap</Link>
                    <Link to={"/information"} className={"nav-item"}>Súgó</Link>
                </nav>
                <div className={"nav-cim"}>
                    <h3 className={"nav-cim-header"}>OCR Scanner</h3>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path={"/"} element={<HomePage/>} />
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
