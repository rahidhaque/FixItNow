import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    serviceId: z.string().min(1, "Service ID is required"),
    totalPrice: z.number().min(0, "Total price must be a positive number"),
    description: z.string().optional(),
  }),
});