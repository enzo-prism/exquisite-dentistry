import React from "react";
import LocationPageTemplate from "@/components/LocationPageTemplate";
import { locationPageConfigs } from "@/data/locationPages";

const MiracleMileDentist = () => {
  return <LocationPageTemplate config={locationPageConfigs["miracle-mile-dentist"]} />;
};

export default MiracleMileDentist;
