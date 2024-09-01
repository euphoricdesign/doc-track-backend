import { Doctor } from "../entities/Doctor"
import DoctorRepository from "../repositories/DoctorRepository"
import { CustomError } from "./userService"

export const getAllDoctorsService = async (category: string): Promise<Doctor[]> => {
    try {
        // Crear la consulta con QueryBuilder
        const query = DoctorRepository.createQueryBuilder('doctor')
            .leftJoinAndSelect('doctor.categories', 'category'); // Unir con 'categories'. 'category' <- alias que usa typeorm para referirse a la tabla medical_category

        // Si se proporciona la categoría, aplicar el filtro
        if (category) {
            query.where('category.name = :category', { category });
        }

        const doctors = await query.getMany(); // Ejecutar la consulta para obtener los médicos

        if (doctors.length > 0) return doctors;
        else throw new CustomError("Médicos no encontrados", 404);
    } catch (error) {
        throw error;
    }
}