import { Request, Response, NextFunction } from "express";


const isValidId = (value: string): boolean => {
    const regex = /^\d+$/;
    return regex.test(value);
  }

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
    if (!isValidId(id)) {
        next({ message: 'Id invalido', statusCode: 400 })
    } else {
        next()
    }
}