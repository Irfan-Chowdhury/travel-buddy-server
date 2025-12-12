
import { z } from 'zod';

const create = z.object({
  body: z.object({
    travelPlanId: z.number().int().positive(),
    reviewedUserId: z.string().min(1),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().optional().nullable(),
  }),
});

export const ReviewValidation = { create, update };
