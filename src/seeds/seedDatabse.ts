import { AppDataSource } from '../config/data-source'
import { MedicalCategory } from "../entities/MedicalCategory";
import { Doctor } from "../entities/Doctor";

export const seedDatabase = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Verificar si las categorías ya existen
    const cardiologyExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "Cardiology" });
    const dermatologyExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "Dermatology" });
    const neurologyExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "Neurology" });
    const pediatricsExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "Pediatrics" });
    const pcpExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "PCP" });
    const gynecologyExists = await queryRunner.manager.findOneBy(MedicalCategory, { name: "Ginecology" });

    const cardiology = cardiologyExists || new MedicalCategory();
    cardiology.name = "Cardiology";

    const dermatology = dermatologyExists || new MedicalCategory();
    dermatology.name = "Dermatology";

    const neurology = neurologyExists || new MedicalCategory();
    neurology.name = "Neurology";

    const pediatrics = pediatricsExists || new MedicalCategory();
    pediatrics.name = "Pediatrics";

    const pcp = pcpExists || new MedicalCategory();
    pcp.name = "PCP";

    const gynecology = gynecologyExists || new MedicalCategory();
    gynecology.name = "Ginecology";

    if (!cardiologyExists) await queryRunner.manager.save(cardiology);
    if (!dermatologyExists) await queryRunner.manager.save(dermatology);
    if (!neurologyExists) await queryRunner.manager.save(neurology);
    if (!pediatricsExists) await queryRunner.manager.save(pediatrics);
    if (!pcpExists) await queryRunner.manager.save(pcp);
    if (!gynecologyExists) await queryRunner.manager.save(gynecology);

    // Verificar si los doctores ya existen
    const doctor1Exists = await queryRunner.manager.findOneBy(Doctor, { email: "juan.perez@ejemplo.com" });
    const doctor2Exists = await queryRunner.manager.findOneBy(Doctor, { email: "maria.garcia@ejemplo.com" });
    const doctor3Exists = await queryRunner.manager.findOneBy(Doctor, { email: "luis.martinez@ejemplo.com" });
    const doctor4Exists = await queryRunner.manager.findOneBy(Doctor, { email: "ana.torres@ejemplo.com" });
    const doctor5Exists = await queryRunner.manager.findOneBy(Doctor, { email: "carmen.jimenez@ejemplo.com" });
    const doctor6Exists = await queryRunner.manager.findOneBy(Doctor, { email: "jorge.ramirez@ejemplo.com" });
    const doctor7Exists = await queryRunner.manager.findOneBy(Doctor, { email: "veronica.perez@ejemplo.com" });
    const doctor8Exists = await queryRunner.manager.findOneBy(Doctor, { email: "pablo.mendoza@ejemplo.com" });
    const doctor9Exists = await queryRunner.manager.findOneBy(Doctor, { email: "francisco.morales@ejemplo.com" });
    const doctor10Exists = await queryRunner.manager.findOneBy(Doctor, { email: "veronica.sanchez@ejemplo.com" });
    const doctor11Exists = await queryRunner.manager.findOneBy(Doctor, { email: "javier.ruiz@ejemplo.com" });
    const doctor12Exists = await queryRunner.manager.findOneBy(Doctor, { email: "natalia.gomez@ejemplo.com" });
    const doctor13Exists = await queryRunner.manager.findOneBy(Doctor, { email: "alfredo.rodriguez@ejemplo.com" });
    const doctor14Exists = await queryRunner.manager.findOneBy(Doctor, { email: "silvia.herrera@ejemplo.com" });
    const doctor15Exists = await queryRunner.manager.findOneBy(Doctor, { email: "elena.torres@ejemplo.com" });
    const doctor16Exists = await queryRunner.manager.findOneBy(Doctor, { email: "laura.mendoza@ejemplo.com" });




    if (!doctor1Exists) {
      const doctor1 = new Doctor();
      doctor1.name = "Dr. Juan Pérez";
      doctor1.categories = [cardiology];
      doctor1.location = "Clínica ABC, Ciudad X";
      doctor1.phone = 123456789;
      doctor1.email = "juan.perez@ejemplo.com";
      doctor1.description = "Specialist in cardiovascular diseases.";
      doctor1.image = "https://www.infobae.com/new-resizer/kTpbPO_yF5zboXTkc2B5knfDTB4=/992x661/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/5KCVGAGSP5HFJA7KMALNP7ITS4.jpg";
      doctor1.availableSlots = ["10:00", "11:30", "13:00", "14:30"]

      await queryRunner.manager.save(doctor1);
    }

    if (!doctor2Exists) {
      const doctor2 = new Doctor();
      doctor2.name = "Dra. María García";
      doctor2.categories = [dermatology];
      doctor2.location = "Hospital XYZ, Ciudad Y";
      doctor2.phone = 987654321;
      doctor2.email = "maria.garcia@ejemplo.com";
      doctor2.description = "Skin problems specialist.";
      doctor2.image = "https://www.shutterstock.com/image-photo/confident-female-doctor-medical-worker-600nw-2400718423.jpg";
      doctor2.availableSlots = ["08:30", "09:45", "12:15", "15:00", "16:30"]
      
      await queryRunner.manager.save(doctor2);
    }

    if (!doctor3Exists) {
      const doctor3 = new Doctor();
      doctor3.name = "Dr. Luis Martínez";
      doctor3.categories = [neurology];
      doctor3.location = "Centro Neurológico, Ciudad Z";
      doctor3.phone = 123123123;
      doctor3.email = "luis.martinez@ejemplo.com";
      doctor3.description = "Clinical neurology specialist.";
      doctor3.image = "https://familydoctor.org/wp-content/uploads/2018/02/41808433_l-848x566.jpg";
      doctor3.availableSlots = ["09:00", "10:30", "14:00", "15:30", "17:00"]

      await queryRunner.manager.save(doctor3);
    }

    if (!doctor4Exists) {
      const doctor4 = new Doctor();
      doctor4.name = "Dra. Ana Torres";
      doctor4.categories = [pediatrics];
      doctor4.location = "Clínica Infantil, Ciudad W";
      doctor4.phone = 456456456;
      doctor4.email = "ana.torres@ejemplo.com";
      doctor4.description = "Pediatrician with experience in child care.";
      doctor4.image = "https://www.pmfarma.com/noticias/noticias/50913/image/mujeres%20medicas.jpg";
      doctor4.availableSlots = ["08:00", "11:00", "13:30", "16:00", "18:30"]

      await queryRunner.manager.save(doctor4);
    }

    if (!doctor5Exists) {
      const doctor5 = new Doctor();
      doctor5.name = "Dr. Carlos Fernández";
      doctor5.categories = [pcp];
      doctor5.location = "Hospital Ortopédico, Ciudad V";
      doctor5.phone = 789789789;
      doctor5.email = "carlos.fernandez@ejemplo.com";
      doctor5.description = "First point of contact for healthcare needs.";
      doctor5.image = "https://eunamed.com/wp-content/uploads/2021/02/medico-especialista-en-chile-768x512.jpg";
      doctor5.availableSlots = ["09:30 ", "12:00", "14:45", "17:15", "19:00"]

      await queryRunner.manager.save(doctor5);
    }

    if (!doctor6Exists) {
      const doctor6 = new Doctor();
      doctor6.name = "Dra. Carmen Jiménez";
      doctor6.categories = [gynecology];
      doctor6.location = "Centro de Ginecología, Ciudad U";
      doctor6.phone = 321321321;
      doctor6.email = "carmen.jimenez@ejemplo.com";
      doctor6.description = "Gynecologist with experience in women's health.";
      doctor6.image = "https://img.freepik.com/foto-gratis/hermosa-joven-doctora-mirando-camara-oficina_1301-7781.jpg?w=1060&t=st=1713415807~exp=1713416407~hmac=0a92ba80cd405e1a0ceb57317ec5d933459c05dadfb5c324e69583e89d6b1929";
      doctor6.availableSlots = ["10:15", "12:45", "15:15", "17:45", "19:30"]

      await queryRunner.manager.save(doctor6);
    }

    if (!doctor7Exists) {
      const doctor7 = new Doctor();
      doctor7.name = "Dr. Sergio Gómez";
      doctor7.categories = [cardiology];
      doctor7.location = "Hospital del Corazón, Ciudad T";
      doctor7.phone = 654654654;
      doctor7.email = "sergio.gomez@ejemplo.com";
      doctor7.description = "Cardiologist with extensive experience in cardiac diseases.";
      doctor7.image = "https://img.freepik.com/fotos-premium/retrato-doctor-hombre-usando-tableta-digital_107420-66908.jpg?w=1060";
      doctor7.availableSlots = ["11:15", "13:45", "16:15", "18:00", "19:45"]

      await queryRunner.manager.save(doctor7);
    }

    if (!doctor8Exists) {
      const doctor8 = new Doctor();
      doctor8.name = "Dra. Verónica Pérez";
      doctor8.categories = [dermatology];
      doctor8.location = "Clínica Dermatológica, Ciudad S";
      doctor8.phone = 654987321;
      doctor8.email = "veronica.perez@ejemplo.com";
      doctor8.description = "Dermatologist specialized in skin treatment.";
      doctor8.image = "https://img.freepik.com/foto-gratis/doctora-bata-laboratorio-blanco-aislado-sonrisa-confiada_343596-6556.jpg?t=st=1713415827~exp=1713419427~hmac=80d1867d1b5369b59cb9399601f07af1e14f58917a64c11bc307a0eff8dd3088&w=1060";
      doctor8.availableSlots = ["08:45", "11:45", "14:15", "16:45", "18:45"]

      await queryRunner.manager.save(doctor8);
    }

    if (!doctor9Exists) {
      const doctor9 = new Doctor();
      doctor9.name = "Dr. Francisco Morales";
      doctor9.categories = [neurology];
      doctor9.location = "Clínica Urológica, Ciudad F";
      doctor9.phone = 741852963;
      doctor9.email = "francisco.morales@ejemplo.com";
      doctor9.description = "Clinical neurology specialist.";
      doctor9.image = "https://online-learning-college.com/wp-content/uploads/2023/01/Qualifications-to-Become-a-Doctor--scaled.jpg";
      doctor9.availableSlots = ["09:00", "10:30", "12:00", "14:00", "16:30"];

      await queryRunner.manager.save(doctor9);
    }

    if (!doctor10Exists) {
      const doctor10 = new Doctor();
      doctor10.name = "Dra. Verónica Sánchez";
      doctor10.categories = [dermatology];
      doctor10.location = "Centro Oftalmológico, Ciudad G";
      doctor10.phone = 852147963;
      doctor10.email = "veronica.sanchez@ejemplo.com";
      doctor10.description = "Skin disease specialist.";
      doctor10.image = "https://i.pinimg.com/564x/6f/2b/c6/6f2bc637d6e4a7d8d03c7f322f8e20bf.jpg";
      doctor10.availableSlots = ["08:00", "09:45", "11:15", "13:30", "15:00"];

      await queryRunner.manager.save(doctor10);
    }

    
    if (!doctor11Exists) {
      const doctor11 = new Doctor();
      doctor11.name = "Dr. Javier Ruiz";
      doctor11.categories = [cardiology];
      doctor11.location = "Instituto Gastroenterológico, Ciudad H";
      doctor11.phone = 963147258;
      doctor11.email = "javier.ruiz@ejemplo.com";
      doctor11.description = "Cardiologist with over 15 years experience.";
      doctor11.image = "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg";
      doctor11.availableSlots = ["07:30", "09:00", "11:00", "13:30", "16:00"];

      await queryRunner.manager.save(doctor11);
    }
    
    if (!doctor12Exists) {
      const doctor12 = new Doctor();
      doctor12.name = "Dra. Natalia Gómez";
      doctor12.categories = [gynecology];
      doctor12.location = "Clínica Reumatológica, Ciudad I";
      doctor12.phone = 357951456;
      doctor12.email = "natalia.gomez@ejemplo.com";
      doctor12.description = "Obstetrician Gynecologist with specialty in fertility.";
      doctor12.image = "https://www.postbaccprogramguide.com/app/uploads/2022/07/iStock-1189304032.jpg";
      doctor12.availableSlots = ["10:00", "12:00", "14:00", "16:00", "17:30"];

      await queryRunner.manager.save(doctor12);
    }

    if (!doctor13Exists) {
      const doctor13 = new Doctor();
      doctor13.name = "Dr. Alfredo Rodríguez";
      doctor13.categories = [pediatrics];
      doctor13.location = "Hospital Pulmonar, Ciudad J";
      doctor13.phone = 258369147;
      doctor13.email = "alfredo.rodriguez@ejemplo.com";
      doctor13.description = "Pediatrician with focus on neonatology.";
      doctor13.image = "https://cdn.euroinnova.edu.es/img/subidasEditor/doctor-5871743_640-1610073541.webp";
      doctor13.availableSlots = ["08:30", "10:30", "12:30", "14:30", "16:30"];

      await queryRunner.manager.save(doctor13);
    }

    if (!doctor14Exists) {
      const doctor14 = new Doctor();
      doctor14.name = "Dra. Silvia Herrera";
      doctor14.categories = [neurology];
      doctor14.location = "Centro Geriátrico, Ciudad K";
      doctor14.phone = 951753456;
      doctor14.email = "silvia.herrera@ejemplo.com";
      doctor14.description = "Clinical neurology specialist.";
      doctor14.image = "https://www.shutterstock.com/image-photo/portrait-successful-smiling-hispanic-female-600nw-2263204855.jpg";
      doctor14.availableSlots = ["09:00", "10:30", "12:00", "14:00", "15:30"];

      await queryRunner.manager.save(doctor14)
    }

    if (!doctor15Exists) {
      const doctor15 = new Doctor();
      doctor15.name = "Dra. Elena Torres";
      doctor15.categories = [pcp];
      doctor15.location = "Centro Endocrinológico, Ciudad E";
      doctor15.phone = 963258741;
      doctor15.email = "elena.torres@ejemplo.com";
      doctor15.description = "First point of contact for healthcare needs.";
      doctor15.image = "https://media.istockphoto.com/id/1425798958/es/foto/foto-de-una-doctora-confiada-en-el-hospital-mirando-a-la-c%C3%A1mara-con-una-sonrisa.jpg?s=612x612&w=0&k=20&c=JIu8o3ANyPehV0bJ9GO4pao2P6dejt6mXqEMHUzUYLk=";
      doctor15.availableSlots = ["08:00", "09:30", "11:00", "12:30", "15:00"];

      await queryRunner.manager.save(doctor15)
    }

    if (!doctor16Exists) {
      const doctor16 = new Doctor();
      doctor16.name = "Dra. Laura Mendoza";
      doctor16.categories = [gynecology];
      doctor16.location = "Centro Ginecológico, Ciudad C";
      doctor16.phone = 456789123;
      doctor16.email = "laura.mendoza@ejemplo.com";
      doctor16.description = "Obstetrician Gynecologist with specialty in fertility.";
      doctor16.image = "https://media.istockphoto.com/id/475780596/es/foto/mantiene-su-salud-es-la-prioridad.jpg?s=612x612&w=0&k=20&c=A1_9PzyoW0JvMHrcN2lOuFaPIoOwwAIP7spnVO5nVu4=";
      doctor16.availableSlots = ["09:00", "11:00", "13:30", "15:30", "17:30"];

      await queryRunner.manager.save(doctor16)
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
