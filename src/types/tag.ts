import { z } from "zod";

// Database entity type
export interface Tag {
  tag_id: string;
  tag: string;
  created_at?: string;
}

// Request schemas
export const createTagSchema = z.object({
  tag: z.string().min(1, "Tag tidak boleh kosong").trim(),
});

export const updateTagSchema = z.object({
  tag: z.string().min(1, "Tag tidak boleh kosong").trim(),
});

// Response schemas
export const tagResponseSchema = z.object({
  message: z.string(),
  tag: z.object({
    tag_id: z.string(),
    tag: z.string(),
    created_at: z.string().optional(),
  }),
});

export const tagsResponseSchema = z.object({
  tags: z.array(
    z.object({
      tag_id: z.string(),
      tag: z.string(),
      created_at: z.string().optional(),
    }),
  ),
});

export const deleteTagResponseSchema = z.object({
  message: z.string(),
});

// Type inference from schemas
export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type TagResponse = z.infer<typeof tagResponseSchema>;
export type TagsResponse = z.infer<typeof tagsResponseSchema>;
export type DeleteTagResponse = z.infer<typeof deleteTagResponseSchema>;
