import { Request, Response } from "express";
import { getAllCategoriesService } from "../services/categoriesService"
import { catchAsync } from "../utils/catchAsync"
import { MedicalCategory } from "../entities/MedicalCategory";

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const categories: MedicalCategory[] = await getAllCategoriesService()
    res.status(200).json({categories})
})