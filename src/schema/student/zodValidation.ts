import zod from "zod"
import { studentValidationInterface } from "../../types/student.interface"
export const createStudentValidationSchema = zod.object({
    name: zod.string().min(3),
    age: zod.number().min(18).max(65),
    isActive: zod.boolean()
})


