import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    createJournalController,
    deleteJournalController,
    getJournalsController
} from "../controllers/journal.controller";
import { validate } from "../middlewares/validation.middleware";
import { CreateJournalSchema } from "../dtos/journal.dto";

const journalRoutes = Router();

// Journal routes
journalRoutes.post("/journal", authMiddleware, validate(CreateJournalSchema), createJournalController);
journalRoutes.delete("/journal/:journalId", authMiddleware, deleteJournalController);
journalRoutes.get("/journals", authMiddleware, getJournalsController);

export default journalRoutes;