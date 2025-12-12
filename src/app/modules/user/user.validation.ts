
import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user','admin']).optional(),
    location: z.string().optional(),
    age: z.number().int().positive().optional(),
    bio: z.string().optional(),
    imageUrl: z.string().optional(),
    interests: z.array(z.number().int().positive()).optional(),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(['user','admin']).optional(),
    location: z.string().optional(),
    age: z.number().int().positive().optional(),
    bio: z.string().optional(),
    imageUrl: z.string().optional(),
    interests: z.array(z.number().int().positive()).optional(),
  }),
});

export const UserValidation = { create, update };
