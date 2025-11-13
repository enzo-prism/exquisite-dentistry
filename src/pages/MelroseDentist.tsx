import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const MelroseDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["melrose-dentist"]} />;
};

export default MelroseDentist;
