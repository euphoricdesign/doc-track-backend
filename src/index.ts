import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import { seedDatabase } from "./seeds/seedDatabse";
import "reflect-metadata"


AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión a la base de datos establecida");

    // Ejecutar precarga de datos
    await seedDatabase();

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("Error al iniciar la aplicación:", error);
});