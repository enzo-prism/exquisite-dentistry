import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const KoreatownDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["koreatown-dentist"]} />;
};

export default KoreatownDentist;
