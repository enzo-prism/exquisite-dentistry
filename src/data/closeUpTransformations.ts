
export interface CloseUpTransformation {
  id: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export const closeUpTransformations: CloseUpTransformation[] = [
  {
    id: "transformation-1",
    beforeImage: "/lovable-uploads/927eb7e1-b5fa-4551-ac20-82666716d7e1.png",
    afterImage: "/lovable-uploads/442f1b06-f170-43a9-ab81-6c7d7e27dda8.png", 
    description: "Complete smile transformation with porcelain veneers"
  },
  {
    id: "transformation-4",
    beforeImage: "/lovable-uploads/5d9db165-60d4-4dee-80d9-5a89d7dacfe5.png",
    afterImage: "/lovable-uploads/f4b9ce7c-33fc-45a7-85e9-123f3e7ce0ed.png",
    description: "Restorative treatment for damaged front teeth"
  },
  {
    id: "transformation-5",
    beforeImage: "/lovable-uploads/124b1461-00bb-4065-9657-02b2984d461f.png",
    afterImage: "/lovable-uploads/e5666e84-eae4-42d0-a75c-f034454be491.png",
    description: "Comprehensive dental rehabilitation"
  }
];
