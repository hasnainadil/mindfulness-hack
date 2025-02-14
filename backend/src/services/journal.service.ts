import { removeJournalVector, saveJournalVector } from "../ai-chat/model-utils";
import { AppDataSource } from "../database";
import { Journal } from "../entities/journals";
import { User } from "../entities/user";
import { ExceptionEnum } from "../types/exceptiontypes";
import { getUserById } from "./user.service";

const journalRepository = AppDataSource.getRepository(Journal);

async function createJournal(userId: number, title: string, content: string): Promise<Journal> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(ExceptionEnum.NOT_FOUND);
    }
    const journal = journalRepository.create({
      user: user,
      title: title,
      content: content
    });
    const newJournal = await journalRepository.save(journal);
    saveJournalVector(userId, newJournal);
    return newJournal;
  } catch (error) {
    throw error;
  }
}

async function getJournals(userId: number): Promise<Journal[]> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(ExceptionEnum.NOT_FOUND);
    }
    return await journalRepository.find({ where: { user: user } });
  } catch (error) {
    throw error;
  }
}

async function getJournalById(userId: number, journalId: number): Promise<Journal> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(ExceptionEnum.NOT_FOUND);
    }
    const journal = await journalRepository.findOneBy({ id: journalId, user: user });
    if (!journal) {
      throw new Error(ExceptionEnum.NOT_FOUND);
    }
    return journal;
  } catch (error) {
    throw error;
  }
}

async function updateJournal(
  userId: number,
  journalId: number,
  title: string,
  content: string
): Promise<Journal> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(ExceptionEnum.NOT_FOUND);
    }
    const journal = await journalRepository.findOneBy({ id: journalId, user: user });
    if (!journal) {
      throw new Error(ExceptionEnum.NOT_FOUND);
    }
    journal.title = title;
    journal.content = content;
    await journalRepository.save(journal);
    return journal;
  } catch (error) {
    throw error;
  }
}

async function deleteJournal(userId: number, journalId: number): Promise<void> {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(ExceptionEnum.NOT_FOUND);
    }
    const journal = await journalRepository.findOne({ where: { id: journalId }, relations: ["user"] });
    if (!journal) {
      throw new Error("Journal not found");
    }
    if (journal.user.id !== user.id) {
      throw new Error("Unauthorized access");
    }
    await removeJournalVector(journal);
    await journalRepository.remove(journal);
  } catch (error) {
    throw error;
  }
}

export {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal
};