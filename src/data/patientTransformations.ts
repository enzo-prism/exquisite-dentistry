
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
  },
  {
    name: "Sarah",
    beforeImg: "/lovable-uploads/5b6f933b-b603-4576-b24d-667cb00cc3a3.png",
    afterImg: "/lovable-uploads/5dbe773a-e027-4877-81cd-fb9d252af50f.png"
  }
  // New patients can be easily added here by following the same structure
];
