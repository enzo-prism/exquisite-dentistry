
export interface PatientTransformation {
  name: string;
  beforeImage: string;
  afterImage: string;
  procedure: string;
  description?: string;
}

// Patient transformation data
export const patientTransformations: PatientTransformation[] = [
  {
    name: "Brittany",
    procedure: "Porcelain Veneers",
    beforeImage: "/lovable-uploads/7be70408-3316-4a36-8ad0-68fafc9d0e05.png",
    afterImage: "/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.png",
    description: "Complete smile transformation with porcelain veneers"
  },
  {
    name: "Ryan",
    procedure: "Invisalign & Whitening",
    beforeImage: "/lovable-uploads/8e2e1684-e2b2-4ebe-81de-ffec0bb4c801.png",
    afterImage: "/lovable-uploads/4820b0df-82b4-4e9b-9724-b8d1f720712b.png",
    description: "Alignment correction and professional whitening"
  },
  {
    name: "Abigail",
    procedure: "Complete Smile Makeover",
    beforeImage: "/lovable-uploads/5dbe773a-e027-4877-81cd-fb9d252af50f.png",
    afterImage: "/lovable-uploads/5b6f933b-b603-4576-b24d-667cb00cc3a3.png",
    description: "Multi-procedure smile transformation"
  },
  {
    name: "Brian",
    procedure: "Dental Implants",
    beforeImage: "/lovable-uploads/e29f50ba-aebe-42e9-b82c-1fd4fe0dbccb.png",
    afterImage: "/lovable-uploads/4a8dedf8-1a60-4e9a-9c1f-91c1a1c96c92.png"
  },
  {
    name: "Jessica",
    procedure: "Porcelain Veneers",
    beforeImage: "/lovable-uploads/c4eb9134-7e7d-4dc3-ab3a-abf2fc453302.png",
    afterImage: "/lovable-uploads/3a42dad4-7415-4cdc-aaad-8186717434d4.png"
  },
  {
    name: "Wilson",
    procedure: "Invisalign & Bonding",
    beforeImage: "/lovable-uploads/ebaec307-40e4-4cf9-9b8a-02379250bb8e.png",
    afterImage: "/lovable-uploads/bb889b6f-f57b-492d-a1d2-06164aedf1e8.png"
  }
];
