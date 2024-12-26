import { z } from "zod";

const CreateJournalSchema = z.object({
    title: z.string(),
    content: z.string(),
});

type CreateJournalDto = z.infer<typeof CreateJournalSchema>;


export {
    CreateJournalSchema,
    CreateJournalDto
}