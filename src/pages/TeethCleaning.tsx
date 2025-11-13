import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const TeethCleaning = () => {
  return <ServicePageTemplate config={servicePageConfigs["teeth-cleaning"]} />;
};

export default TeethCleaning;
