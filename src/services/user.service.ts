import { database, writeFile } from "../database";
import { userInterface } from "../types/user.interface";


const db = JSON.parse(database());
export const createUser = (data: userInterface) => {

    const newId = (db.users.length + 1).toString();

    const newUser = { id: newId, ...data };

    db.users.push(newUser);
    writeFile(db);

    return newUser;
};

export const getAllUsers = () => {

    return db.users;
};

export const getUserById = (id: string) => {

    return db.users.find((u: any) => u.id === id);
};

export const updateUser = (id: string, data: Partial<userInterface>) => {

    const index = db.users.findIndex((u: any) => u.id === id);

    if (index === -1) return null;

    db.users[index] = { ...db.users[index], ...data };
    writeFile(db);

    return db.users[index];
};

export const deleteUser = (id: string) => {

    const index = db.users.findIndex((u: any) => u.id === id);

    if (index === -1) return null;

    const deleted = db.users.splice(index, 1);
    writeFile(db);

    return deleted[0];
};
