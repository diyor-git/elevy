import {z} from "zod";

export const projectSchema = z.object({
    title: z.string().min(3, "Title is required").max(100),
    description: z.string().min(50, ),
    short_description: z.string().min(10, "Short description is required"),
    category: z.string().min(1, "Category is required"),
    requiredSkills: z.array(z.string()).min(1, "Add at least 1 skill").max(10),
    stage: z.string().min(1),
    maxParticipants: z.coerce.number().min(1).max(50),
    hasNda: z.boolean().default(false)
})


export type ProjectForm = z.infer<typeof projectSchema>