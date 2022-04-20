import hardcodeHouse from "../../styles/images/hardcode-house.jpg";
import Nav from "../Nav";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDetailCalendar,
  getHomeDetail,
  addAgenda,
} from "../../redux/actions/index";
import Gallery from "./Gallery";
import Footer from "../Footer";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ImLocation2 } from "react-icons/im";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CalendarOneDay from "../Calendar/CalendarOneDay";
import HoursPicker from "../Calendar/HoursPicker";

import "react-datepicker/dist/react-datepicker.css";
import { addFavourites } from "../../redux/actions/index";
import React, { useState, useEffect } from "react";
import Review from "./Review";
import Comment from "./Comment";
/* import DirectChatPage from "../chatbox/DirectChatPage"; */

const Detail = ({ name, city, country, cost, measure, rooms, description }) => {
  name = "Hardcode Street";
  city = "Hardcode City";
  country = "Hardcode Country";
  cost = "$4000 usd";
  measure = "300 sq m";
  rooms = 5;
  description =
    "A perfect place to rest, in a very quiet neighborhood, 5 minutes walk from some places of interest (Parque Principal, Cancha, Malecón, Terminal de buses), located in the urban area, with the possibility of parking in front of the accommodation and system security 24/7.";

  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const dispatch = useDispatch();
  const apiKey =
    "pk.eyJ1IjoiY2x1ejEyMyIsImEiOiJjbDFteGU3d2wwb2FlM2RtbTl1cGo1dmJ5In0.jk1TN2dm1nwc5Drrwx9MLQ";
  const detail = useSelector((state) => state.homeDetail);

  let userId = detail[0]?.seller.userId;
  let sellId = detail[0]?.sellerId;
  useEffect(() => {
    dispatch(getHomeDetail(id));
    return () => {
      dispatch(getHomeDetail([]));
    };
  }, []);
  console.log("detail", detail);

  const calendarInfo = useSelector((state) => state.detailCalendar);

  const photos =
    detail[0]?.photos?.length > 0
      ? detail[0].photos.map((photo) => photo.photos)
      : null;

  // Calendar

  const [selectedDay, setSelectedDay] = useState();
  const [selectedDate, setSelectedDate] = useState({ hours: "", minutes: "" });

  const handleButton = () => {
    if (!calendarInfo.length) {
      dispatch(getDetailCalendar(userId));
    } else {
      let agendaObj = {
        place: detail[0].address + ", " + detail[0].city,
        dates: selectedDay,
        hours: selectedDate,
        sellerId: sellId,
        buyerId: user.user.buyers[0].id,
      };
      dispatch(addAgenda(agendaObj));
    }
  };

  //AÑADIR A FAVORITOS

  const userObject = useSelector((state) => state.user);
  console.log(userObject);
  const [values, setValues] = useState({
    buyerId: userObject.user?.id,
    propertyId: detail[0]?.id,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(values);
      await dispatch(addFavourites(values));

      alert("Favourite added successfully!");
    } catch (err) {
      console.log(err.message);
      alert("We could not add your favourite. Please try again.");
    }
  }
  return (
    <div class=" text-center  ">
      <div class="bg-[#075985]">
        <div class="bg-sky-900 shadow-nav h-20 relative z-20 ">
          <Nav />
        </div>
      </div>
      <h2 class="mt-6 text-stone-600 text-5xl font-base font-Poppins">
        <strong>
          {detail[0]?.country},{detail[0]?.city}
        </strong>
      </h2>
      <div class="w-500 h-500 ml-20 mr-20 mb-10 mt-10">
        {photos ? (
          <Gallery
            photos={photos}
            lease={detail[0]?.lease ? detail[0]?.lease : Sale}
          />
        ) : null}
      </div>

      <div class="mx-32 px-6 mt-12 grid grid-cols-4 gap-6 mb-6">
        <div>
          <h5 class="text-center font-Poppins">
            Measure: <strong> {detail[0]?.m2 ? detail[0].m2 : 45} m²</strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <path d="M17.66,17.66l-1.06,1.06l-0.71-0.71l1.06-1.06l-1.94-1.94l-1.06,1.06l-0.71-0.71l1.06-1.06l-1.94-1.94l-1.06,1.06 l-0.71-0.71l1.06-1.06L9.7,9.7l-1.06,1.06l-0.71-0.71l1.06-1.06L7.05,7.05L5.99,8.11L5.28,7.4l1.06-1.06L4,4v14c0,1.1,0.9,2,2,2 h14L17.66,17.66z M7,17v-5.76L12.76,17H7z" />
                </g>
              </g>
            </svg>
          </h5>
        </div>
        <div>
          <h5 class="text-center font-Poppins">
            Rooms:
            <strong>
              {detail[0]?.features[0]?.produc_features.value
                ? detail[0]?.features[0]?.produc_features.value
                : 2}
            </strong>
          </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <path d="M22,12c0-1.1-0.9-2-2-2V7c0-1.1-0.9-2-2-2H6C4.9,5,4,5.9,4,7v3c-1.1,0-2,0.9-2,2v5h1.33L4,19h1l0.67-2h12.67L19,19h1 l0.67-2H22V12z M18,10h-5V7h5V10z M6,7h5v3H6V7z M4,12h16v3H4V12z" />
            </g>
          </svg>
        </div>
        <div>
          <h5 class="text-center font-Poppins">
            Bathrooms:
            <strong>
              {detail[0]?.features[1]?.produc_features.value
                ? detail[0]?.features[1]?.produc_features.value
                : 1}
            </strong>
          </h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <g>
                <circle cx="7" cy="7" r="2" />
                <path d="M20,13V4.83C20,3.27,18.73,2,17.17,2c-0.75,0-1.47,0.3-2,0.83l-1.25,1.25C13.76,4.03,13.59,4,13.41,4 c-0.4,0-0.77,0.12-1.08,0.32l2.76,2.76c0.2-0.31,0.32-0.68,0.32-1.08c0-0.18-0.03-0.34-0.07-0.51l1.25-1.25 C16.74,4.09,16.95,4,17.17,4C17.63,4,18,4.37,18,4.83V13h-6.85c-0.3-0.21-0.57-0.45-0.82-0.72l-1.4-1.55 c-0.19-0.21-0.43-0.38-0.69-0.5C7.93,10.08,7.59,10,7.24,10C6,10.01,5,11.01,5,12.25V13H2v6c0,1.1,0.9,2,2,2c0,0.55,0.45,1,1,1h14 c0.55,0,1-0.45,1-1c1.1,0,2-0.9,2-2v-6H20z M20,19H4v-4h16V19z" />
              </g>
            </g>
          </svg>
        </div>
        <div>
          <div class="grid grid-cols-2 gap-3">
            <button onClick={handleSubmit}>Favourite</button>
          </div>
        </div>
      </div>

      <hr />
      <div class="py-8 px-6 mb-6 text-xl font-bold font-Poppins">
        <p class="mb-6">
          {detail[0]?.description ? detail[0]?.description : description}
        </p>
        <hr />
        <div>
          <h3>Main data of the property</h3>
        </div>
        <div class="mx-32 px-6 mt-12 grid grid-cols-3 gap-6 mb-6">
          <div>
            <h5 class="text-center font-Poppins">
              City: <strong>{detail[0]?.city}</strong>
            </h5>
            <h5 class="text-center font-Poppins">
              Country: <strong>{detail[0]?.country}</strong>
            </h5>
          </div>
          <div>
            <h5 class="text-center font-Poppins">
              Cost: <strong>{detail[0]?.cost}</strong>
            </h5>
            <h5 class="text-center font-Poppins">
              State: <strong>{detail[0]?.state}</strong>
            </h5>
          </div>
        </div>
        <hr />

        
          {detail[0] && <Review text={detail[0]?.reviews} />}
        

        <Comment />
        <hr />
        <div>
          <h3 class="px-6 mt-6 mb-6 text-xl font-bold font-Poppins">
            Book an appointment
          </h3>
          {calendarInfo.length !== 0 && (
            <div className="flex justify-center">
              <div className="ml-5 rounded border border-stone-400/75">
                <CalendarOneDay
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  defaultFrom={calendarInfo[0].dates.from}
                  defaultTo={calendarInfo[0].dates.to}
                  className=""
                />
              </div>
              <div className="ml-5 pt-16 ">
                <HoursPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  className=""
                />
              </div>
            </div>
          )}
          <button
            onClick={() => handleButton()}
            className="my-6 text-base text-white font-Monserrat font-bold bg-sky-500 transition ease-in-out duration-200 hover:bg-sky-700 px-2 py-1 rounded"
          >
            Schedule
          </button>
        </div>
        <div className="">
          <div className="w-full">
            <h3 class="px-6 mt-6 mb-6 text-xl font-bold font-Poppins">
              You will live here I
            </h3>
            <div className="relative bg-black w-full h-64">
              {apiKey ? (
                detail.length ? (
                  <ReactMapGL
                    initialViewState={{
                      latitude: detail[0].longitude,
                      longitude: detail[0].latitude,
                      zoom: 5,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={apiKey}
                  >
                    {
                      <Marker
                        latitude={detail[0].longitude}
                        longitude={detail[0].latitude}
                        draggable={false}
                      >
                        <ImLocation2 className="h-8 w-8 text-teal-600" />
                      </Marker>
                    }
                  </ReactMapGL>
                ) : (
                  "loading.."
                )
              ) : (
                "Loading.."
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 font-normal text-base font-Monserrat">
          <Footer />
        </div>
      </div>

      {/* {
        detail.length? <DirectChatPage seller={detail[0].seller.user}/> : ""
      } */}
    </div>
  );
};;

export default Detail;
