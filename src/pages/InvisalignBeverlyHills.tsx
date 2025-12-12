import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const InvisalignBeverlyHills = () => {
  return (
    <ServicePageTemplate config={servicePageConfigs["invisalign-beverly-hills"]} />
  );
};

export default InvisalignBeverlyHills;

