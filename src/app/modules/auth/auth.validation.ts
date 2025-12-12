
import { z } from 'zod';

const register = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user','admin']).optional(),
    imageUrl: z.string().url().optional(),
    location: z.string().optional(),
    age: z.number().int().positive().optional(),
    bio: z.string().optional(),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const AuthValidation = { register, login };
