import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const SmileMakeoverLosAngeles = () => {
  return (
    <ServicePageTemplate
      config={servicePageConfigs["smile-makeover-los-angeles"]}
    />
  );
};

export default SmileMakeoverLosAngeles;

