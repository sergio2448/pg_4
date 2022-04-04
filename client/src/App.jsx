import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Create from "./components/Create/Create"
import Detail from "./components/Detail/Detail";

function App() {
    return (
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='/state' element={<List />} />
                    <Route path='/state/:id' element={<Detail />}/> */}
            <Route path="/state/create" element={<Create />} />
            {/* <Route path='*' element={<PageNotFound />} /> */}
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </div>
      </div>
    );
};

export default App;
