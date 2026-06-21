import z from "zod";

export const SignupFormSchema = z
    .object({
        fullName: z.string().trim().min(1, "Full name is required"),
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        repeatPassword: z.string().min(8, "Password must be at least 8 characters"),
    })
    .refine(data => data.password === data.repeatPassword, {
        error: "Passwords do not match",
        path: ["repeatPassword"],
    });

export type FormData = z.infer<typeof SignupFormSchema>;
