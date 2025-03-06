import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await hash(password, saltRounds);
};

export const matchPassword = async (enteredPassword: string, storedHashedPassword: string): Promise<boolean> => {
    return await compare(enteredPassword, storedHashedPassword);
};
