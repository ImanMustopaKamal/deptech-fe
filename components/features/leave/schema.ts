import { z } from "zod";
import { employeePartialSchema } from "../employee/schema";

export const leaveSchema = z.object({
  id: z.number(),
  reason: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  employeeId: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  employee: employeePartialSchema
});
export type Leave = z.infer<typeof leaveSchema>;
