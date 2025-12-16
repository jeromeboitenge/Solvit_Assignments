import { email } from "zod";
import { UserModal } from "../model/users";
import { UserInterface } from "../types/usersIntercface";


export class UsersServices {

    userExists = async (email: string) => {
        const userExist = await UserModal.exists({
            email: email
        })
        return userExist

    }

    createUser = async (user: UserInterface) => {
        const newUser = await UserModal.create({
            ...user
        })
        await newUser.save();
        return {
            ...newUser,
            password: undefined
        }
    }
    getAllUsers = async () => {
        const allUsers = await UserModal.find().select("-password").exec()
        return allUsers
    }
    async getUser({ email }: { email: string }) {
        return await UserModal.findOne({
            email,
        });
    }

    updateUser = async (email: string, updateData: Partial<UserInterface>) => {
        const updatedUser = await UserModal.findByIdAndUpdate(
            email,
            updateData,
            { new: true }
        ).select("-password");

        return updatedUser;
    }


}