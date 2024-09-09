import { Request, Response } from "express";
import { addNewAppointmentService, cancelAppointmentService, getAllAppointmentsService, getAppointmentService, getAvailableTimesService, rescheduleAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";
import { catchAsync } from "../utils/catchAsync";
import { CustomError } from "../services/userService";

export const getAvailableTimes = catchAsync(async (req: Request, res: Response) => {
    const { date } = req.body

    if (!date) throw new CustomError("Date parameter is required", 404)

    const parsedDate = new Date(date as string);

    const formattedDate = parsedDate.toISOString().split('T')[0];

    const availableTimes = getAvailableTimesService(formattedDate)

    res.status(200).json({ times: availableTimes })
})

export const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
    const appointments: Appointment[] = await getAllAppointmentsService()
    res.status(200).json(appointments)
})

export const getAppointment = catchAsync(async (req: Request, res: Response) => {

    const appointmentId: number = Number(req.params.id)
    const appointment: Appointment | null = await getAppointmentService(appointmentId)
    res.status(200).json(appointment)

})

export const addNewAppointment = catchAsync(async (req: Request, res: Response) => {
    const { date, time, description, userId, doctorId } = req.body
    const newAppointment: Appointment = await addNewAppointmentService({ date, time, description, userId, doctorId})
    res.status(201).json(newAppointment)
})

export const cancelAppointment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId: number = Number(req.params.id)
    await cancelAppointmentService(appointmentId)
    res.status(200).json({message: "Turno cancelado con éxito"})
})

export const rescheduleAppointment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId: number = Number(req.params.id)
    const { newDate, newTime }: any = req.body

    await rescheduleAppointmentService(appointmentId, newDate, newTime)
    res.status(200).json({message: "Turno reprogramado con éxito"})
})