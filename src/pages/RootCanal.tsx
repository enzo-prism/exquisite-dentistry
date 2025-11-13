import React from "react";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { servicePageConfigs } from "@/data/servicePages";

const RootCanal = () => {
  return <ServicePageTemplate config={servicePageConfigs["root-canal"]} />;
};

export default RootCanal;
