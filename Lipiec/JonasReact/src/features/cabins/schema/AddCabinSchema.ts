import z from "zod";

export const AddCabinSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required!" })
      .min(1, "Name is required!"),
    maxCapacity: z
      .number({ required_error: "Max Capacity is required!" })
      .min(1, "Max Capacity minimum of 1!"),
    regularPrice: z
      .number({ required_error: "Regular Price is required!" })
      .min(1, "Regular price minimum of 1!"),
    discount: z
      .number({ required_error: "Discount is required!" })
      .max(100, "Discount must be max of 100!"),
    description: z
      .string({ required_error: "Description is required!" })
      .min(1, "Description is required!"),
    image: z.any(),
  })
  .refine((data) => data.discount <= data.regularPrice, {
    message: "Discount must be lower than regular price",
    path: ["discount"],
  });

export type AddCabin = z.infer<typeof AddCabinSchema>;
