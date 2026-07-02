import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const LarchmontDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["larchmont-dentist"]} />;
};

export default LarchmontDentist;
