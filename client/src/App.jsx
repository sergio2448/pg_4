import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Create from "./components/Create/Create"
import Detail from "./components/Detail/Detail";
import List from './components/List/List';
import Settings from './components/DropdownProfile/Settings';
import "@material-tailwind/react/tailwind.css";

function App() {

    return (
      <div>
        <div>
            <div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/estate' element={<List />} />
                    <Route path='/estate/:id' element={<Detail />}/>
                    <Route path='/estate/create' element={<Create />} />
                    <Route path='/logged' element={<Settings/>} />
                    
                    {/* <Route path='*' element={<PageNotFound />} /> */}
                </Routes>
            </div>
        </div>
      </div>
    );
};

export default App;
