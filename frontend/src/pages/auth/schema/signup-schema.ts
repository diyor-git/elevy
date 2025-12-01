import { z } from "zod";

export const signupSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    gender: z.enum(["male", "female"], {
        required_error: "Gender is required",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    birthDate: z.string() // можно заменить на date
});

export type SignupSchema = z.infer<typeof signupSchema>;
