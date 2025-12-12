import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const TeethWhiteningBeverlyHills = () => {
  return (
    <ServicePageTemplate
      config={servicePageConfigs["teeth-whitening-beverly-hills"]}
    />
  );
};

export default TeethWhiteningBeverlyHills;

