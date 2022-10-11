import React from "react";
import LaptopViewFilters from "./LaptopViewFilters";
import MobileViewFilters from "./MobileViewFilters";

const Filters = ({ setFilteredState }) => {
  return (
    <>
      <MobileViewFilters />
      <LaptopViewFilters />
    </>
  );
};

export default Filters;
