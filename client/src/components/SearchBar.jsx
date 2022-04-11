import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchbar } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

export default function SearchBar (){
    const navigate = useNavigate();
    const [filterSelect, setFilterSelect] = useState('Venta');
    // const features = useSelector((state) => state.features);
    const [features, setFeatures] = useState({
        pool: '',
        floor: '',
        bathrooms: '',
        garden: '',
        rooms: ''
    })
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

    function handleSelect (e){
        let value = e.target.value
        if(value === 'Yes') {
            value = 1;
        } else if(value === 'No') {
            value = 0;
        }
        setFeatures({
                ...features,
                [e.target.name]: value
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
        dispatch(getSearchbar(aInput, {listFeatures : features}));
        if(window.location.pathname == '/'){
            navigate('/estate');
        }
    }
    let ubi = window.location.pathname;
    return (
        <div>
            
            {
                // Venta/Alquiler
                filterSelect == 'Venta' ? (<div className='flex justify-center'>
                <div className='  bg-stone-800 text-base text-sky-500 font-Monserrat font-bold px-4 py-1 ' >Buy</div>
                <div title='Alquiler' onClick={(e) => handleDivs(e)}  className='bg-stone-900 text-base text-white font-Monserrat font-bold px-4 py-1 '>Rent</div>
            </div>) : (<div className='flex justify-center'>
                <div title='Venta' onClick={(e) => handleDivs(e)}  className=' bg-stone-900 text-base text-white font-Monserrat font-bold px-4 py-1  ' >Buy</div>
                <div className=' bg-stone-800 text-base text-sky-500 font-Monserrat font-bold px-4 py-1 '>Rent</div>
            </div>)            
            }
            <form onSubmit={(e) => handleForm(e)} className={window.location.pathname == '/' ? ('flex items-center m-auto justify-center z-10 w-6/12 h-16 bg-stone-800') : ('flex items-center m-auto justify-center z-10 w-9/12 py-6 bg-stone-800')}>
                {
                    window.location.pathname !== '/' ? ( <div>
                        {/* <select onChange={(e)=>handleInput(e)} name='features' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                            <option selected="false" disabled>Features</option>
                            {
                                features.length ? features.map(f => {
                                   return (<option key={f.id} value={f.name} >{f.name}</option>)
                                }) : <option></option>
                            }
                        </select>  */}
                        <div className={window.location.pathname == '/' ? ('flex items-center m-auto justify-center z-10 w-full h-16 bg-stone-800') : ('flex items-center m-auto justify-center z-10 mb-6 bg-stone-800')}><select onChange={(e)=>handleInput(e)} name='searchType' className='pl-2 mr-5 rounded transition ease-in-out delay-200 bg-sky-300 hover:bg-sky-200 text-stone-800 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                  <option value='address' >Address</option>
                  <option value='city' >City</option>
                  <option value='state' >State</option>
                  <option value='country' >Country</option>
                  <option value='cp' >Postal Code</option>
                  <option value='cost' >Cost</option>
                </select>
              <input onChange={(e)=>handleInput(e)} name='searchInput' type='text' placeholder='Address, Cost, Country, Zip Code..' className='pl-2 rounded w-9/12 transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'/>
              <button type='submit' className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>Search!</button></div>
                        <select  onChange={(e) => {handleSelect(e)}} name='rooms' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                            <option>Rooms</option>
                            <option>1</option>
                            <option>2</option>
                            <option>+3</option>
                        </select>
                        <select  onChange={(e) => {handleSelect(e)}} name='bathrooms' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                            <option >Bathrooms</option>
                            <option>1</option>
                            <option>2</option>
                            <option>+3</option>
                        </select>
                        <select onChange={(e) => {handleSelect(e)}} name='garden' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                            <option >Garden</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        <select onChange={(e) => {handleSelect(e)}} name='pool' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                            <option >Pool</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        <select  onChange={(e) => {handleSelect(e)}} name='floor' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                            <option >Floors</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                     </div>)
                        
                         :
                         
                         (<div className={window.location.pathname == '/' ? ('flex items-center m-auto justify-center z-10 w-full h-16 bg-stone-800') : ('flex items-center m-auto justify-center z-10 w-9/12 h-16 bg-stone-800')}><select onChange={(e)=>handleInput(e)} name='searchType' className='pl-2 mr-5 rounded transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'>
                  <option value='address' >Address</option>
                  <option value='city' >City</option>
                  <option value='state' >State</option>
                  <option value='country' >Country</option>
                  <option value='cp' >Postal Code</option>
                  <option value='cost' >Cost</option>
                </select>
              <input onChange={(e)=>handleInput(e)} name='searchInput' type='text' placeholder='Address, Cost, Country, Zip Code..' className='pl-2 rounded w-3/6 transition ease-in-out delay-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-2 h-8'/>
              <button type='submit' className='ml-5 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded'>Search!</button></div>)
                }
                
            </form>
        </div>
    )
}