import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const PainFreeDentistry = () => {
  return <ServicePageTemplate config={servicePageConfigs["pain-free-dentistry"]} />;
};

export default PainFreeDentistry;
