// Legacy type - consider using Location from ./location.ts instead
export type ShootingLocation = {
  uuid: string;
  name: string;
  city: string;
  price: number;
  description: string;
  area: number;
  imageUrl: string;
  pax: number;
  rate: number;
};

// Updated type matching current database schema
export type ShootingLocationDB = {
  shooting_location_id: string;
  shooting_location_name: string;
  shooting_location_city: string;
  shooting_location_price: string;
  shooting_location_description: string;
  shooting_location_area: number;
  shooting_location_image_url: string[];
  shooting_location_pax: number;
  shooting_location_rate: number;
  created_at?: string;
};
