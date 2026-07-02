import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const HancockParkDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["hancock-park-dentist"]} />;
};

export default HancockParkDentist;
