import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"

function App() {
    return (
        <div >
            <div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    {/* <Route path='/state' element={<List />} />
                    <Route path='/state/:id' element={<Detail />}/>
                    <Route path='/admin' element={<Admin />} />
                    <Route path='*' element={<PageNotFound />} /> */}
                </Routes>
            </div>
        </div>
    );
};

export default App;
