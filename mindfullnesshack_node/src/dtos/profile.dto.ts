import { z } from "zod";
import { GenderTypes } from "../types/usetypes";

export const ProfileUpdateSchema = z.object({
    name: z.string().min(3).max(255),
    age: z.number().int().min(13).max(150),
    gender: z.enum(["MALE", "FEMLAE", "OTHER"])
})

export type ProfileUpdateDTO = {
    name: string;
    age: number;
    gender: GenderTypes;
}