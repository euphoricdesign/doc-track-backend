import { Request, Response } from "express";
import { getAllUsersService, getUserService, loginUserService, registerNewUserService } from "../services/userService";
import { User } from "../entities/User";
import { catchAsync } from "../utils/catchAsync";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users: User[] = await getAllUsersService()
    res.status(200).json(users)
})

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const userId: string = req.params.id
    const user: User | null = await getUserService(Number(userId))
    res.status(200).json(user);
})

export const registerNewUser = catchAsync(async (req: Request, res: Response) => {
    const {name, email, birthdate, nDni, username, password} = req.body;
    const user: User = await registerNewUserService({name, email, birthdate, nDni, username, password})
    res.status(201).json(user);
})

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const response = await loginUserService({ username, password })

    res.status(200).json(response)
})

