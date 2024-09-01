import { AppDataSource } from '../config/data-source'
import { MedicalCategory } from "../entities/MedicalCategory";
import { Doctor } from "../entities/Doctor";

export const seedDatabase = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Verificar si las categorías ya existen
    const cardiologyExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "Cardiología" });
    const dermatologyExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "Dermatología" });

    const cardiology = cardiologyExists || new MedicalCategory();
    cardiology.name = "Cardiología";

    const dermatology = dermatologyExists || new MedicalCategory();
    dermatology.name = "Dermatología";

    if (!cardiologyExists) await queryRunner.manager.save(cardiology);
    if (!dermatologyExists) await queryRunner.manager.save(dermatology);

    // Verificar si los doctores ya existen
    const doctor1Exists = await queryRunner.manager.findOneBy(Doctor, { email: "juan.perez@ejemplo.com" });
    const doctor2Exists = await queryRunner.manager.findOneBy(Doctor, { email: "maria.garcia@ejemplo.com" });

    if (!doctor1Exists) {
      const doctor1 = new Doctor();
      doctor1.name = "Dr. Juan Pérez";
      doctor1.categories = [cardiology];
      doctor1.location = "Clínica ABC, Ciudad X";
      doctor1.phone = 123456789;
      doctor1.email = "juan.perez@ejemplo.com";
      doctor1.description = "Especialista en enfermedades cardiovasculares.";
      doctor1.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW5xC7l1MPMk1D2hHH_5_xH-Nd5lsogHP_iw&s";

      await queryRunner.manager.save(doctor1);
    }

    if (!doctor2Exists) {
      const doctor2 = new Doctor();
      doctor2.name = "Dra. María García";
      doctor2.categories = [dermatology];
      doctor2.location = "Hospital XYZ, Ciudad Y";
      doctor2.phone = 987654321;
      doctor2.email = "maria.garcia@ejemplo.com";
      doctor2.description = "Especialista en problemas de la piel.";
      doctor2.image = "https://img.freepik.com/fotos-premium/joven-doctora-asiatica-pie-sobre-fondo-azul_296537-5450.jpg";

      await queryRunner.manager.save(doctor2);
    }

    await queryRunner.commitTransaction();
    console.log("Base de datos poblada correctamente");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
