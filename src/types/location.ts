import { z } from "zod";

// Database entity type
export interface Location {
  shooting_location_id: string;
  shooting_location_name: string;
  shooting_location_city: string;
  shooting_location_price: string;
  shooting_location_description: string;
  shooting_location_area: number;
  shooting_location_pax: number;
  shooting_location_rate: number;
  shooting_location_image_url: string[];
  created_at?: string;
}

// Location with tags (for responses with joined data)
export interface LocationWithTags extends Location {
  tags: string[];
}

// Request schemas
export const createLocationSchema = z.object({
  name: z.string().min(1, "Nama lokasi tidak boleh kosong"),
  city: z.string().optional().default(""),
  price: z.string().optional().default(""),
  description: z.string().optional().default(""),
  area: z.number().nonnegative().optional().default(0),
  pax: z.number().int().nonnegative().optional().default(0),
  rate: z.number().min(0).max(5).optional().default(0),
  tags: z.array(z.string()).optional().default([]),
  images: z.array(z.instanceof(File)).optional(),
});

export const updateLocationSchema = z.object({
  name: z.string().min(1, "Nama lokasi tidak boleh kosong"),
  city: z.string().optional().default(""),
  price: z.string().optional().default(""),
  description: z.string().optional().default(""),
  area: z.number().nonnegative().optional().default(0),
  pax: z.number().int().nonnegative().optional().default(0),
  rate: z.number().min(0).max(5).optional().default(0),
  tags: z.array(z.string()).optional().default([]),
  existingImageUrls: z.array(z.string()).optional().default([]),
  images: z.array(z.instanceof(File)).optional(),
});

// Response schemas
export const locationResponseSchema = z.object({
  message: z.string(),
  location: z.object({
    shooting_location_id: z.string(),
    shooting_location_name: z.string(),
    shooting_location_city: z.string(),
    shooting_location_price: z.string(),
    shooting_location_description: z.string(),
    shooting_location_area: z.number(),
    shooting_location_pax: z.number(),
    shooting_location_rate: z.number(),
    shooting_location_image_url: z.array(z.string()),
    created_at: z.string().optional(),
  }),
});

export const locationsResponseSchema = z.object({
  locations: z.array(
    z.object({
      shooting_location_id: z.string(),
      shooting_location_name: z.string(),
      shooting_location_city: z.string(),
      shooting_location_price: z.string(),
      shooting_location_description: z.string(),
      shooting_location_area: z.number(),
      shooting_location_pax: z.number(),
      shooting_location_rate: z.number(),
      shooting_location_image_url: z.array(z.string()),
      tags: z.array(z.string()),
      created_at: z.string().optional(),
    }),
  ),
});

export const deleteLocationResponseSchema = z.object({
  message: z.string(),
});

// Type inference from schemas
export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
export type LocationResponse = z.infer<typeof locationResponseSchema>;
export type LocationsResponse = z.infer<typeof locationsResponseSchema>;
export type DeleteLocationResponse = z.infer<
  typeof deleteLocationResponseSchema
>;
