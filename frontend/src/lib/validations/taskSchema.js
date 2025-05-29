import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .refine(
      (val) => val.trim().length > 0,
      "Title cannot be empty or just spaces"
    ),

  description: z
    .string()
    .min(1, "Description is required")
    .refine(
      (val) => val.trim().length > 0,
      "Description cannot be empty or just spaces"
    ),

  category: z.enum(["Business", "Personal", "Education"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),

  dueDate: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return undefined;
  }, z.date({ required_error: "Due date is required" })),

  location: z.object({
    lat: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ required_error: "Latitude is required" })
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90")
    ),
    lng: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ required_error: "Longitude is required" })
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180")
    ),
  }),
  status: z.boolean().optional(),
});
