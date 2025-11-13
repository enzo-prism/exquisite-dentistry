import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const WestwoodDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["westwood-dentist"]} />;
};

export default WestwoodDentist;
