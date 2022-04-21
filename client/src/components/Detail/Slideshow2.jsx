import React from "react";
import "tw-elements";
import hardcodeHouse from "../../styles/images/hardcode-house.jpg";

const Slideshow2 = ({ photos }) => {
  
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner relative w-full overflow-hidden">
        <div className="carousel-item active relative float-left w-full">
          <img
            src={
              photos.length >= 1
                ? "https://new-pg.herokuapp.com/Properties/images/" + photos[0]
                : hardcodeHouse
            }
            className="block w-96 h-60"
            alt="Photo 1"
          />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src={
              photos.length >= 2
                ? "https://new-pg.herokuapp.com/Properties/images/" + photos[1]
                : hardcodeHouse
            }
            className="block w-96 h-60"
            alt="Photo 2"
          />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src={
              photos.length >= 3
                ? "https://new-pg.herokuapp.com/Properties/images/" + photos[2]
                : hardcodeHouse
            }
            className="block w-96 h-60"
            alt="Photo 3"
          />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src={
              photos.length >= 4
                ? "https://new-pg.herokuapp.com/Properties/images/" + photos[3]
                : hardcodeHouse
            }
            className="block w-96 h-60"
            alt="Photo 4"
          />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src={
              photos.length >= 5
                ? "https://new-pg.herokuapp.com/Properties/images/" + photos[4]
                : hardcodeHouse
            }
            className="block w-96 h-60"
            alt="Photo 5"
          />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src={
              photos.length >= 6
                ? "https://new-pg.herokuapp.com/Properties/images/" + photos[5]
                : hardcodeHouse
            }
            className="block w-96 h-60"
            alt="Photo 6"
          />
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src={
              photos.length >= 7
                ? "https://new-pg.herokuapp.com/Properties/images/" + photos[6]
                : hardcodeHouse
            }
            className="block w-96 h-60"
            alt="Photo 7"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slideshow2;
