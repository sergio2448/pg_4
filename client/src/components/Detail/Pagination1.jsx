import React from "react";
import Pagination from "@material-tailwind/react/Pagination";
import PaginationItem from "@material-tailwind/react/PaginationItem";
import Icon from "@material-tailwind/react/Icon";

export default function Pagination1() {
  return (
    <Pagination>
      <PaginationItem button href="#last" ripple="dark">
        First
      </PaginationItem>
      <PaginationItem href="#last" ripple="dark">
        <Icon name="keyboard_arrow_left" />
      </PaginationItem>
      <PaginationItem color="lightBlue" href="#1" ripple="light">
        1
      </PaginationItem>
      <PaginationItem href="#2" ripple="dark">
        2
      </PaginationItem>
      <PaginationItem href="#3" ripple="dark">
        3
      </PaginationItem>
      <PaginationItem href="#4" ripple="dark">
        4
      </PaginationItem>
      <PaginationItem href="#5" ripple="dark">
        5
      </PaginationItem>
      <PaginationItem href="#last" ripple="dark">
        <Icon name="keyboard_arrow_right" />
      </PaginationItem>
      <PaginationItem button href="#last" ripple="dark">
        Last
      </PaginationItem>
    </Pagination>
  );
}
