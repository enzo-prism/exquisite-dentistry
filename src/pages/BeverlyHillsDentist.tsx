import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const BeverlyHillsDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["beverly-hills-dentist"]} />;
};

export default BeverlyHillsDentist;
