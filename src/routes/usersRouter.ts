import { Router } from "express";
import { getAllUsers, getUser, registerNewUser, loginUser } from "../controllers/userControllers";
import { validateId } from "../middlewares/validateId";

const usersRouter: Router = Router()

usersRouter.get('/', getAllUsers)
usersRouter.get('/:id', getUser)
usersRouter.post('/register', registerNewUser) 
usersRouter.post('/login', loginUser)

export default usersRouter