import hardcodeHouse from "../../styles/images/hardcode-house.jpg";
import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Slideshow2 from "./Slideshow2";
import genericImage from "../../styles/images/INME.png"

const Gallery = ({ photos, lease }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <>
        <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
          <ModalHeader toggler={() => setShowModal(false)}>{lease}</ModalHeader>
          <ModalBody>
            <div className="">
              <Slideshow2 photos={photos} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="red"
              buttonType="link"
              onClick={(e) => setShowModal(false)}
              ripple="dark"
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
      <section class="overflow-hidden text-gray-700 w-full">
        <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32 mb-24">
          <div class="flex flex-wrap -m-1 md:-m-2">
            <div class="flex flex-wrap w-1/2">
              <div class="w-full p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 1
                      ? "https://new-pg.herokuapp.com/Properties/images/" + photos[0]
                      : genericImage
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
            </div>
            <div class="flex flex-wrap w-1/2">
              <div class="w-1/2 p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 2
                      ? "https://new-pg.herokuapp.com/Properties/images/" + photos[1]
                      : genericImage
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 3
                      ? "https://new-pg.herokuapp.com/Properties/images/" + photos[2]
                      : genericImage
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 4
                      ? "https://new-pg.herokuapp.com/Properties/images/" + photos[3]
                      : genericImage
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 5
                      ? "https://new-pg.herokuapp.com/Properties/images/" + photos[4]
                      : genericImage
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 6
                      ? "https://new-pg.herokuapp.com/Properties/images/" + photos[5]
                      : genericImage
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
              <div class="w-1/2 p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 7
                      ? "https://new-pg.herokuapp.com/Properties/images/" + photos[6]
                      : genericImage
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;