// Props for AppCard component
export interface AppCardProps {
  id: string;
  name: string;
  city: string;
  price: string;
  description?: string;
  area: number;
  imageUrl: string[];
  pax: number;
  rate: number;
  tags: string[];
}
