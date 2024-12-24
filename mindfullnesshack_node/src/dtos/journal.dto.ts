import { z } from "zod";

export const CreateJournalSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export type CreateJournalDto = z.infer<typeof CreateJournalSchema>;
