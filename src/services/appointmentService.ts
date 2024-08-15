import AppointmentDto from "../dto/appointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import AppointmentRepository from "../repositories/AppointmentRepository";
import { CustomError } from "./userService";

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    try {
        const allAppointments = AppointmentRepository.find({
            relations: {
                user: true
            }
        })
        if (allAppointments) return allAppointments
        else throw new CustomError("Turnos no encontrados", 404)
    } catch (error) {
        throw error;
    }
}

export const getAppointmentService = async (appointmentId: number): Promise<Appointment | null> => {
    try {
        const appointment: Appointment | null = await AppointmentRepository.findOne({
            where: { id: appointmentId },
            relations: ['user']
        })
        if (appointment) return appointment
        else throw new CustomError("Turno no encontrado", 404)
    } catch (error) {
        throw error;
    }
}

export const addNewAppointmentService = async (newAppointment: AppointmentDto): Promise<Appointment> => {
    try {
        const user: User | null = await UserRepository.findOneBy({ id: newAppointment.userId })
        if (!user) throw new CustomError("ID invalido. No se encontro un usuario", 400)
        else {
            const createdAppointment = await AppointmentRepository.create(newAppointment)
            await AppointmentRepository.save(createdAppointment)

            createdAppointment.user = user
            await AppointmentRepository.save(createdAppointment)
            return createdAppointment
        }
    } catch (error) {
        throw error;
    }
}

export const cancelAppointmentService = async (appointmentId: number) => {

    const appointment = await AppointmentRepository.findOneBy({id: appointmentId})

    if (!appointment) throw new CustomError("Turno no encontrado", 404)
    else {
        appointment.status = AppointmentStatus.Cancelled
        await AppointmentRepository.save(appointment)
    }
}