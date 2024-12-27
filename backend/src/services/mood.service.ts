import { Between } from "typeorm";
import { AppDataSource } from "../database";
import { Mood } from "../entities/mood";
import { MoodType } from "../types/mood.types";
import { getUserById } from "./user.service";
import { endOfDay, startOfDay } from "date-fns";

const moodRepository = AppDataSource.getRepository(Mood);

async function createMood(userId: number, mood: MoodType): Promise<Mood> {
  try {
    const user = await getUserById(userId);
    const newMood = moodRepository.create({
      user: user,
      mood: mood
    });
    return await moodRepository.save(newMood);
  } catch (error) {
    throw error;
  }
}

async function deleteMood(userId: number, moodId: number): Promise<void> {
  try {
    const user = await getUserById(userId);
    const mood = await moodRepository.findOneBy({ id: moodId, user: user });
    if (!mood) {
      throw new Error("Mood not found");
    }
    await moodRepository.remove(mood);
  } catch (error) {
    throw error;
  }
}

async function getMoods(userId: number): Promise<Mood[]> {
  try {
    const user = await getUserById(userId);
    return await moodRepository.find({ where: { user: user } });
  } catch (error) {
    throw error;
  }
}

async function getMoodById(userId: number, moodId: number): Promise<Mood> {
  try {
    const user = await getUserById(userId);
    const mood = await moodRepository.findOneBy({ id: moodId, user: user });
    if (!mood) {
      throw new Error("Mood not found");
    }
    return mood;
  } catch (error) {
    throw error;
  }
}

async function getTodaysMoods(userId: number): Promise<Mood[]> {
  try {
    const user = await getUserById(userId);
    const moods = await moodRepository.findBy({ user: user, date: Between(startOfDay(new Date()), endOfDay(new Date())) });
    if (moods.length === 0) {
      throw new Error("Mood not found");
    }
    return moods;
  } catch (error) {
    throw error;
  }
}

export { createMood, deleteMood, getMoods, getMoodById, getTodaysMoods };