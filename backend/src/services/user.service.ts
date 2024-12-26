import { AppDataSource } from "../database";
import { ProfileUpdateDTO } from "../dtos/profile.dto";
import { Question } from "../entities/question";
import { User } from "../entities/user";
import { ExceptionEnum } from "../types/exceptiontypes";

const userRepository = AppDataSource.getRepository(User);

async function getUserById(userId: number): Promise<User> {
    try {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(ExceptionEnum.NOT_FOUND);
        }
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserProfile(userId: number): Promise<Partial<User>> {
    try {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(ExceptionEnum.NOT_FOUND);
        }
        // Remove password from the user object
        const { password, ...userProfile } = user;
        return userProfile;
    } catch (error) {
        throw error;
    }
}

async function updateUserProfile(userId: number, updatedFields: ProfileUpdateDTO): Promise<void> {
    try {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new Error(ExceptionEnum.NOT_FOUND);
        }
        await userRepository.update(userId, { ...updatedFields });
    } catch (error) {
        throw error;
    }
}

async function getUserByQuestion(question : Question): Promise<User> {
    try {
        const user = await userRepository.findOneBy({  });
        if (!user) {
            throw new Error(ExceptionEnum.NOT_FOUND);
        }
        return user;
    } catch (error) {
        throw error;
    }
}

export { getUserById, getUserProfile, updateUserProfile };