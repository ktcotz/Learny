import z from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
    image: z.union([
      z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine(
          (files) => files?.[0]?.size <= MAX_FILE_SIZE,
          `Max file size is 5MB.`
        )
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          ".jpg, .jpeg, .png and .webp files are accepted."
        ),
      z.literal(""),
    ]),
  })
  .refine((data) => data.discount <= data.regularPrice, {
    message: "Discount must be lower than regular price",
    path: ["discount"],
  });

export type AddCabin = z.infer<typeof AddCabinSchema>;
