import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Create from "./components/Create/Create"
import Detail from "./components/Detail/Detail";
import List from './components/List/List';
import Settings from './components/DropdownProfile/Settings';
import "@material-tailwind/react/tailwind.css";
import PaypalButton from './components/paypal/paypalbutton.jsx';          
import PaypalButtonSub from './components/paypal/paypalbuttonsub.jsx';          
import Payment from './components/paypal/payment';          
import ListProperties from './components/Seller/ListProperties';
import StripedTable from './components/DropdownProfile/StripedTable';
import UserInfo from './components/DropdownProfile/UserInfo';
import FormInfo from './components/DropdownProfile/FormInfo';
import Dashadmin from "./components/admin modules/Dashadmin";
import UsersAdmin from "./components/admin modules/Users/UsersAdmin"
import SellerCalendar from "./components/Seller/SellerCalendar"
import AdminProperties from './components/DropdownProfile/AdminProperties';
import Schedule from './components/Detail/Schedule';
import Features from './components/admin modules/Features';

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
                    <Route path='/estate/edit/:id' element={<Create />} />
                    <Route path='/logged/Favorites' element={<StripedTable/>} />
                    <Route path='/logged/myprofile' element={<UserInfo/>} />
                    <Route path='/logged/Updatedata' element={<FormInfo/>} />  
                    <Route path='/logged/SellerCalendar' element={<SellerCalendar />} />  
                    <Route path='/logged/Publishing' element={<AdminProperties />} />
                    <Route path='/logged/SellerCalendar' element={<SellerCalendar />} />
                    <Route path='/logged/Quotes' element={<Schedule />} />
                    <Route path='/pay/:id' element={<PaypalButton/>}/>
                    <Route path='/payment' element={<Payment/>}/>
                    <Route path='/listProperties' element={<ListProperties />} />
                    <Route path='/sub' element={<PaypalButtonSub/>}/>
                    <Route path="/cardad" element={<Dashadmin />} />
                    <Route path='/admin/users' element={<UsersAdmin />} />
                    <Route path='/admin/features' element={<Features />} />
                    {/* <Route path='*' element={<PageNotFound />} /> */}
                </Routes>
            </div>
        </div>
      </div>
    );
};

export default App;
