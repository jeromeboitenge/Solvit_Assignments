import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ResponseService } from "../../utils";

const responseServices = new ResponseService

export enum Type {
    BODY = "body",
    PARAMS = "params",
    QUERY = "query"

}
export interface joiRequestType<T> {
    schema: ObjectSchema<T>
    type: Type


}
export const validationMiddleware = <T>({ schema, type }: joiRequestType<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[type];
        const validates = schema.validate(data)
        if (validates.error) {
            responseServices.response({
                res,
                statusCode: 400,
                data: validates.error.details,
                success: false

            })

        }
        next()

    }

}