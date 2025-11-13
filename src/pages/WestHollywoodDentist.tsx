import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const WestHollywoodDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["west-hollywood-dentist"]} />;
};

export default WestHollywoodDentist;
