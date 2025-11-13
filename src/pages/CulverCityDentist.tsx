import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const CulverCityDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["culver-city-dentist"]} />;
};

export default CulverCityDentist;
