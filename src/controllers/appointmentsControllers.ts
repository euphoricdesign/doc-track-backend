import { Request, Response } from "express";
import { addNewAppointmentService, cancelAppointmentService, getAllAppointmentsService, getAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";
import { catchAsync } from "../utils/catchAsync";



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
    const { date, time, description, userId } = req.body
    const newAppointment: Appointment = await addNewAppointmentService({ date, time, description, userId})
    res.status(201).json(newAppointment)
})

export const cancelAppointment = async (req: Request, res: Response) => {
    const appointmentId: number = Number(req.params.id)
    await cancelAppointmentService(appointmentId)
    res.status(200).json({message: "Turno cancelado con éxito"})
}