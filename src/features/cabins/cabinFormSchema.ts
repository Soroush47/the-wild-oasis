import z from "zod";

export const CabinFormSchema = z
    .object({
        name: z.string().trim().min(1, "Name is required"),
        maxCapacity: z
            .number({ error: "Capacity should be at least 1" })
            .min(1, "Capacity should be at least 1"),
        regularPrice: z
            .number({ error: "Regular price should be at least 1$" })
            .min(1, "Regular price should be at least 1$"),
        discount: z.number().min(0),
        description: z.string().trim().min(1, "Description is required"),
        image: z
            .instanceof(FileList)
            .refine(() => 1 <= 2_000_000, "Max size is 2MB")
            .optional()
            .or(z.string()),
    })
    .superRefine((data, ctx) => {
        if (data.discount >= data.regularPrice) {
            ctx.addIssue({
                code: "custom",
                message: "Discount should be less than regular price",
                path: ["discount"],
            });
        }
    });

export type FormData = z.infer<typeof CabinFormSchema>;