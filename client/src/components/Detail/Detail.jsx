import React from "react";
import hardcodeHouse from "../../styles/images/hardcode-house.jpg";
import seller from "../../styles/images/seller.png";
import Nav from "../Nav";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {getHomeDetail} from '../../redux/actions/index'

const Detail = ({ name, city, country, cost, measure, rooms }) => {
  name = "Hardcode Street";
  city = "Hardcode City";
  country = "Hardcode Country";
  cost = "$4000 usd";
  measure = "300 sq m";
  rooms = 5;

  let {id}       = useParams();
  const dispatch  = useDispatch();
  const detail   = useSelector(state => state.homeDetail);
  

  useEffect(() => {
     dispatch(getHomeDetail(id));
    return () => {dispatch(getHomeDetail([]))}
    },[id])

    console.log(detail);
  return (
    <div className=" text-center ">
      <div className="bg-[#075985]">
      <div className='bg-stone-900 h-20 relative z-20'>
                <Nav />
            </div>
      </div>
      <h2 className="mt-6 text-stone-600 text-5xl font-base font-Poppins">
        <strong>{name}</strong>
      </h2>
      <div className="mx-32 px-5 mt-12 grid grid-cols-4 gap-6">
        <div>
          <img
            className="border-2 h-full object-cover transition ease-in-out duration-200 hover:opacity-60"
            src={detail.length>0?'http://localhost:3001/Properties/images/'+detail[0].photos[0].photos:hardcodeHouse}
          />
        </div>
        <div>
          <img
            className="w-60 border-2 object-cover transition ease-in-out duration-200 hover:opacity-60"
            src={hardcodeHouse}
          />
          <img
            className="w-60 border-2 object-cover transition ease-in-out duration-200 hover:opacity-60"
            src={hardcodeHouse}
          />
        </div>
        <div>
          <img
            className="w-60 border-2 object-cover transition ease-in-out duration-200 hover:opacity-60"
            src={hardcodeHouse}
          />
          <img
            className="w-60 border-2 object-cover transition ease-in-out duration-200 hover:opacity-60"
            src={hardcodeHouse}
          />
        </div>
        <div>
          <img
            className="w-60 border-2 object-cover transition ease-in-out duration-200 hover:opacity-60"
            src={hardcodeHouse}
          />
          <img
            className="w-60 border-2 object-cover transition ease-in-out duration-200 hover:opacity-60"
            src={hardcodeHouse}
          />
        </div>
      </div>
      <div className="mx-32 px-6 mt-12 grid grid-cols-3 gap-6 mb-6">
        <div>
          <h5 className="text-center">
            <strong>City:</strong> {city}
          </h5>
          <h5 className="text-center">
            <strong>Country:</strong> {country}
          </h5>
        </div>
        <div>
          <h5 className="text-center">
            <strong>Cost:</strong> {cost}{" "}
          </h5>
          <h5 className="text-center">
            <strong>Measure:</strong> {measure}{" "}
          </h5>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3">
            <h5 className="text-right">
              <strong>User:</strong> Pepito Perez
            </h5>
            <img className="h-10 w-10 rounded-full" src={seller} alt="" />
          </div>
          <button className="text-white text-sm font-bold ml-4 font-Poppins opacity-100 z-120 bg-rose-500 px-2 py-1 rounded">
            Check Availability
          </button>
        </div>
      </div>
      <hr />
      <div className="py-8 px-6 mb-6 text-xl font-bold font-Monserrat">
        <p className="mb-6">
          A perfect place to rest, in a very quiet neighborhood, 5 minutes walk
          from some places of interest (Parque Principal, Cancha, Malecón,
          Terminal de buses), located in the urban area, with the possibility of
          parking in front of the accommodation and system security 24/7.
        </p>
        <hr />
        <div>
          <h3 className="px-6 mt-6 mb-6 text-xl font-bold font-Monserrat">
            You will live here
          </h3>
          <div className="relative bg-black w-full h-64 mt-6">
            <iframe
              className="w-full h-full "
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=es&amp;q=Tucuman,%20Argentina+(Mi%20nombre%20de%20egocios)&amp;t=&amp;z=6&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/car-satnav-gps/">
                Car Navigation Systems
              </a>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
