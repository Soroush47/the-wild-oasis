import z from "zod";

export const UpdatePasswordFormSchema = z
    .object({
        password: z.string().min(8, "Password must be at least 8 characters"),
        passwordConfirm: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine(data => data.password === data.passwordConfirm, {
        error: "Passwords do not match",
        path: ["passwordConfirm"],
    });

export type FormData = z.infer<typeof UpdatePasswordFormSchema>;
