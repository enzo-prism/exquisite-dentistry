import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const BelAirDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["bel-air-dentist"]} />;
};

export default BelAirDentist;
