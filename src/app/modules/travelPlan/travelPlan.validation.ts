
import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string().min(1),
    shortDescription: z.string().optional(),
    destination: z.string().min(1),
    startDate: z.string().min(1), // ISO date
    endDate: z.string().min(1),
    budget: z.number().int().nonnegative().optional(),
    travelType: z.string().optional(),
    itinerary: z.any().optional(), // array or json
    groupSize: z.number().int().positive().optional(),
    status: z.enum(['active','completed','cancelled']).optional(),
    interests: z.array(z.number().int().positive()).optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    shortDescription: z.string().optional(),
    destination: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    budget: z.number().int().nonnegative().optional().nullable(),
    travelType: z.string().optional().nullable(),
    itinerary: z.any().optional().nullable(),
    groupSize: z.number().int().positive().optional(),
    status: z.enum(['active','completed','cancelled']).optional(),
    interests: z.array(z.number().int().positive()).optional(),
  }),
});

const join = z.object({
  body: z.object({
    message: z.string().optional(),
  }).optional(),
});

export const TravelPlanValidation = { create, update, join };
