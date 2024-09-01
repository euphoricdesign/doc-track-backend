import { Router } from "express"
import { addNewAppointment, cancelAppointment, getAllAppointments, getAppointment, rescheduleAppointment } from "../controllers/appointmentsControllers"
import { validateId } from "../middlewares/validateId"
import { validateDateAndHour } from "../middlewares/validateDateAndHour"

const appointmentsRouter: Router = Router()

appointmentsRouter.get('/', getAllAppointments) 
appointmentsRouter.get('/:id', validateId, getAppointment) 
appointmentsRouter.post('/schedule', validateDateAndHour, addNewAppointment) 
appointmentsRouter.put('/cancel/:id', validateId, cancelAppointment) 
appointmentsRouter.put('/reschedule/:id', validateId, validateDateAndHour, rescheduleAppointment) 

export default appointmentsRouter