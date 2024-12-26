import { AppDataSource } from "../database";
import { RegisterDto } from "../dtos/auth.dto";
import { User } from "../entities/user";
import { ExceptionEnum } from "../types/exceptiontypes";
import { comparePassword, encryptPassword } from "../utils/encryption";

const userRepository = AppDataSource.getRepository(User);

const registerService = async (newUser: RegisterDto) => {
    const { name, email, password, age, gender } = newUser;
    const existingUser = await userRepository.findOneBy({ email: email });
    if (existingUser) {
        throw new Error(ExceptionEnum.Already_Exists);
    }
    const hashedPassword = await encryptPassword(password);
    const user = userRepository.create({ name, email, password: hashedPassword, age, gender });
    return await userRepository.save(user);
}

const loginService = async (email: string, password: string) => {
    const user = await userRepository.findOneBy({ email });
    if (!user || !(await comparePassword(password, user?.password))) {
        throw new Error(ExceptionEnum.UNAUTHORIZED);
    }
    return user;
}

export { registerService, loginService };