import { AppDataSource } from "../config/data-source";
import { Doctor } from "../entities/Doctor";

const DoctorRepository = AppDataSource.getRepository(Doctor)

export default DoctorRepository