import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const SantaMonicaDentalImplants = () => {
  return (
    <ServicePageTemplate
      config={servicePageConfigs["santa-monica-dental-implants"]}
    />
  );
};

export default SantaMonicaDentalImplants;
