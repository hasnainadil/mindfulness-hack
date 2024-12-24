import { z } from "zod";
import { MoodType } from "../types/mood.types";

export const CreateMoodSchema = z.object({
    mood: z.number().int().min(1, "Mood must be between 1 and 5").max(5, "Mood must be between 1 and 5"),
});

export type CreateMoodDto = z.infer<typeof CreateMoodSchema>;