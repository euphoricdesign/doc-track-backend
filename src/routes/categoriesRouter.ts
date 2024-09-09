import { Router } from "express";
import { getAllCategories } from "../controllers/categoriesControllers";

const categoriesRouter = Router()

categoriesRouter.get('/', getAllCategories)

export default categoriesRouter