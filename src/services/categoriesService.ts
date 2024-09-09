import MedicalCategoryRepository from "../repositories/MedicalCategoryRepository"
import { CustomError } from "./userService"

export const getAllCategoriesService = async () => {
    try {
        const categories = await MedicalCategoryRepository.find()
        if (categories) return categories
        else throw new CustomError("Categorías no encontradas", 404)
    } catch (error) {
        throw error
    }
}