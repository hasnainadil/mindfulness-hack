import { z } from "zod";
import { GenderTypes } from "../types/usetypes";

const ProfileUpdateSchema = z.object({
    name: z.string().min(3).max(255),
    age: z.number().int().min(13).max(150),
    gender: z.enum([GenderTypes.MALE, GenderTypes.FEMALE, GenderTypes.OTHER]),
})

type ProfileUpdateDTO = z.infer<typeof ProfileUpdateSchema>;

export {
    ProfileUpdateSchema,
    ProfileUpdateDTO
}