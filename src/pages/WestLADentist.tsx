import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const WestLADentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["west-la-dentist"]} />;
};

export default WestLADentist;
