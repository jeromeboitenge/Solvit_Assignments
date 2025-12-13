import { Schema } from "mongoose";

export const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        trim: true

    },
    gender: {
        type: String,
        enum: ["Female", "Male", "Other"]
    },
    role: {
        type: String,
        enum: ["user", "student", "admin"]

    },
    passord: {
        type: String,
    },
    isActive: {
        type: Boolean
    },
},
    { timestamps: true }
)
export const UserModal = schema.model("Users", UserSchema);
