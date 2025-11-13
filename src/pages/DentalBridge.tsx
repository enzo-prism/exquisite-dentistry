import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const DentalBridge = () => {
  return <ServicePageTemplate config={servicePageConfigs["dental-bridge"]} />;
};

export default DentalBridge;
