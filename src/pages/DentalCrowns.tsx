import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const DentalCrowns = () => {
  return <ServicePageTemplate config={servicePageConfigs["dental-crowns"]} />;
};

export default DentalCrowns;
