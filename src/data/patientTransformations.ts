
export interface PatientTransformation {
  name: string;
  beforeImg: string;
  afterImg: string;
}

// Patient transformation data
export const patientTransformations: PatientTransformation[] = [
  {
    name: "Brittany",
    beforeImg: "/lovable-uploads/7be70408-3316-4a36-8ad0-68fafc9d0e05.png",
    afterImg: "/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png"
  },
  {
    name: "Ryan",
    beforeImg: "/lovable-uploads/8e2e1684-e2b2-4ebe-81de-ffec0bb4c801.png",
    afterImg: "/lovable-uploads/4820b0df-82b4-4e9b-9724-b8d1f720712b.png"
  }
  // New patients can be easily added here by following the same structure
];
