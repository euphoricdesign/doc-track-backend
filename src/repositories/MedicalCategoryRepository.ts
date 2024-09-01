import { AppDataSource } from "../config/data-source";
import { MedicalCategory } from "../entities/MedicalCategory";

const MedicalCategoryRepository = AppDataSource.getRepository(MedicalCategory)

export default MedicalCategoryRepository