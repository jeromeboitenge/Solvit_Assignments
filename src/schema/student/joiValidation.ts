import Joi from "joi";
import { studentValidationInterface } from "../../types/student.interface"




export const createVaridationSchema = Joi.object({
    name: Joi.string().min(5).required(),

    age: Joi.number().min(18).max(65),
    isActive: Joi.boolean()
})