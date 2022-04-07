import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchbar } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

export default function SearchBar (){
    const navigate = useNavigate();
    const [filterSelect, setFilterSelect] = useState('Venta');
    const features = useSelector((state) => state.features);
    const [input, setInput] = useState({
        searchType: 'address',
        searchInput: '',
        searchDivs: 'Venta',
        features: ''
    });
    const dispatch = useDispatch();    
    

    function handleInput (e){
        setInput({
                ...input,
                [e.target.name]: e.target.value
            }
        );
    }

    function handleDivs (e){
        if(e.target.title == 'Venta'){
            setFilterSelect('Venta');
            setInput({
                    ...input,
                    ['searchDivs']: 'Venta'
                }
            );
        }else if(e.target.title == 'Alquiler'){            
            setFilterSelect('Alquiler');
            setInput({
                    ...input,
                    ['searchDivs']: 'Alquiler'
                }
            );
        }
    }

    function handleForm (e){
        e.preventDefault();
        let aInput = `lease=${input.searchDivs}&${input.searchType}=${input.searchInput}`;
        dispatch(getSearchbar(aInput));
        if(window.location.pathname == '/'){
            navigate('/estate');
        }
    }
    let ubi = window.location.pathname;
    return (
        <div>
            {
                filterSelect == 'Venta' ? (<div className='flex justify-center'>
                <div className='  bg-stone-800 text-base text-sky-500 font-Monserrat font-bold px-4 py-1 ' >Buy</div>
                <div title='Alquiler' onClick={(e) => handleDivs(e)}  className='bg-stone-900 text-base text-white font-Monserrat font-bold px-4 py-1 '>Rent</div>
            </div>) : (<div className='flex justify-center'>
                <div title='Venta' onClick={(e) => handleDivs(e)}  className=' bg-stone-900 text-base text-white font-Monserrat font-bold px-4 py-1  ' >Buy</div>
                <div className=' bg-stone-800 text-base text-sky-500 font-Monserrat font-bold px-4 py-1 '>Rent</div>
            </div>)            
            }
            <form onSubmit={(e) => handleForm(e)} className={window.location.pathname == '/' ? ('flex items-center m-auto justify-center z-10 w-6/12 h-16 bg-stone-800') : ('flex items-center m-auto justify-center z-10 w-9/12 h-16 bg-stone-800')}>
                {
                    window.location.pathname !== '/' ? (
                        <select onChange={(e)=>handleInput(e)} name='features' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                            <option selected="false" disabled>Features</option>
                            {
                                features.length ? features.map(f => {
                                   return (<option key={f.id} value={f.name} >{f.name}</option>)
                                }) : <option></option>
                            }
                        </select>) : <span></span>
                }
                <select onChange={(e)=>handleInput(e)} name='searchType' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                <option selected="false" disabled>Location/Cost</option>
                  <option value='address'>Address</option>
                  <option value='city' >City</option>
                  <option value='state' >State</option>
                  <option value='country' >Country</option>
                  <option value='cp' >Postal Code</option>
                  <option value='cost' >Cost</option>
                </select>
              <input onChange={(e)=>handleInput(e)} name='searchInput' type='text' placeholder='Address, Cost, Country, Zip Code..' className='pl-2 rounded w-3/6 transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'/>
              <button type='submit' className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>Search!</button>
            </form>
        </div>
    )
}