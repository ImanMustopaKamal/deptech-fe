import { z } from 'zod'

export const adminSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
})

export type Admin = z.infer<typeof adminSchema>
