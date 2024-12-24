import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createJournal,
  deleteJournal,
  getJournals
} from '../services/journal.service';
import { verifyToken } from '../utils/jwt-utils';

export async function createJournalController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const { title, content } = req.body;
    const newJournal = await createJournal(userId, title, content);
    res
      .status(StatusCodes.CREATED)
      .send({
        id: newJournal.id,
        title: newJournal.title,
        content: newJournal.content,
        createdAt: newJournal.createdAt
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.BAD_REQUEST).send(err.message);
    }
  }
}

export async function deleteJournalController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const journalId = parseInt(req.params.journalId);
    await deleteJournal(userId, journalId);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    }
  }
}

export async function getJournalsController(req: Request, res: Response) {
  try {
    const userId = verifyToken(req.cookies.access_token);
    const journals = await getJournals(userId);
    res
      .status(StatusCodes.OK)
      .send(journals.map(journal => ({
        id: journal.id,
        title: journal.title,
        content: journal.content,
        createdAt: journal.createdAt
      })));
  } catch (err) {
    if (err instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
    }
  }
}