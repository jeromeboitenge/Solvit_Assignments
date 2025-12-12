import { Request, Response } from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../services/user.service";

export const createUserController = (req: Request, res: Response) => {
    const user = createUser(req.body);
    res.status(201).json({
        message: "User created successfully",
        data: user
    });
};

export const getUsersController = (req: Request, res: Response) => {
    const users = getAllUsers();
    res.status(200).json({ data: users });
};

export const getUserController = (req: Request, res: Response) => {
    const user = getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ data: user });
};

export const updateUserController = (req: Request, res: Response) => {
    const user = updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Updated", data: user });
};

export const deleteUserController = (req: Request, res: Response) => {
    const deleted = deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted", data: deleted });
};
