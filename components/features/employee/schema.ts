import { z } from "zod";

export const employeeSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  gender: z.string(),
  totalLeaveDays: z.number(),
});
export type Employee = z.infer<typeof employeeSchema>;

export const employeePartialSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export type EmployeePartial = z.infer<typeof employeePartialSchema>;
