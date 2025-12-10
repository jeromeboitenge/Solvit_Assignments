import Joi from "joi";
import { studentValidationInterface } from "../../types/student.interface"




export const createVaridationSchema = Joi.object({
    name: Joi.string().required().message('Field name is required'),
    age: Joi.number().min(18).max(65).required().message('Field age required'),
    isActive: Joi.boolean
})