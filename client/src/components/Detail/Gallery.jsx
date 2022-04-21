import hardcodeHouse from "../../styles/images/hardcode-house.jpg";
import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Slideshow2 from "./Slideshow2";

const Gallery = ({ photos, lease }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <>
        <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
          <ModalHeader toggler={() => setShowModal(false)}>{lease ==="Venta" ? "Sale" : "Buy"}</ModalHeader>
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
      <section class="overflow-hidden text-gray-700">
        <div class="container max-w-md px-5 py-2 mx-auto lg:pt-24 lg:px-32">
          <div class="flex flex-wrap -m-1 md:-m-2">
            <div class="flex flex-wrap w-1/2">
              <div class="w-full p-1 md:p-2 overflow-hidden">
                <img
                  alt="gallery"
                  class="block object-cover object-center w-full h-full max-w-full max-h-full rounded-xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                  src={
                    photos.length >= 1
                      ? "http://localhost:3001/Properties/images/" + photos[0]
                      : hardcodeHouse
                  }
                  onClick={(e) => setShowModal(true)}
                />
              </div>
            </div>
            <div className="h-96">
              <div class="flex flex-wrap w-1/2">
              {
                photos && photos.slice(0).map(photo => 
                  <div class="w-1/2 p-1 md:p-2 overflow-hidden">
                  <img
                    alt="gallery"
                    class="block object-cover object-center w-full h-full rounded-lg cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                    src={
                      photos.length >= 2
                        ? "http://localhost:3001/Properties/images/" + photo
                        : hardcodeHouse
                    }
                    onClick={(e) => setShowModal(true)}
                  />
                  </div>
                )
              }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;