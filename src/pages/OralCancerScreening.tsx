import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const OralCancerScreening = () => {
  return <ServicePageTemplate config={servicePageConfigs["oral-cancer-screening"]} />;
};

export default OralCancerScreening;
