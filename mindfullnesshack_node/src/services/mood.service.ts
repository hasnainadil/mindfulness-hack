import { AppDataSource } from "../database";
import { Mood } from "../entities/mood";
import { MoodType } from "../types/mood.types";
import { getUserById } from "./user.service";

const moodRepository = AppDataSource.getRepository(Mood);

export async function createMood(userId: number, mood: MoodType): Promise<Mood> {
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

export async function deleteMood(userId: number, moodId: number): Promise<void> {
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

export async function getMoods(userId: number): Promise<Mood[]> {
  try {
    const user = await getUserById(userId);
    return await moodRepository.find({ where: { user: user } });
  } catch (error) {
    throw error;
  }
}

export async function getMoodById(userId: number, moodId: number): Promise<Mood> {
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