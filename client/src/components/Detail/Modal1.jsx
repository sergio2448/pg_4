import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Slideshow2 from "./Slideshow2";

export default function Modal1({ photos }) {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  return (
    <>
      <Button
        color="lightBlue"
        type="button"
        onClick={(e) => setShowModal(true)}
        ripple="light"
      >
        Open large Modal
      </Button>

      <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
        <ModalHeader toggler={() => setShowModal(false)}>
          Modal Title
        </ModalHeader>
        <ModalBody>
          <Slideshow2 photos={photos} />
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

          <Button
            color="green"
            onClick={(e) => setShowModal(false)}
            ripple="light"
          >
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
