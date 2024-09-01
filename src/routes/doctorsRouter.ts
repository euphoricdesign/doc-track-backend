import { Router } from "express";
import { getAllDoctors } from "../controllers/doctorsControllers";

const doctorsRouter = Router();

doctorsRouter.get('/', getAllDoctors);

export default doctorsRouter;