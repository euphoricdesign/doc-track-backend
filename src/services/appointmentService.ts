import AppointmentDto from "../dto/appointmentDto";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import AppointmentRepository from "../repositories/AppointmentRepository";
import { CustomError } from "./userService";
import { Doctor } from "../entities/Doctor";
import DoctorRepository from "../repositories/DoctorRepository";

export const getAvailableTimesService = async (date: string) => {
    try {
        const allPossibleTimes: any = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

        const existingAppointments = await AppointmentRepository.find({
            where: { date }
        })
    
        const takenTimes = existingAppointments.map((appointment: any) => appointment.time)
    
        const availableTimes = allPossibleTimes.filter((time: any) => !takenTimes.includes(time))
    
        if (availableTimes) return availableTimes
        else throw new CustomError("Not schedule found", 404)
    } catch (error) {
        throw error;
    }
}

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
    try {
        const allAppointments = await AppointmentRepository.find({
            relations: {
                user: true,
                doctor: true
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
        const doctor: Doctor | null = await DoctorRepository.findOneBy({id: newAppointment.doctorId})

        if (!user) {
            throw new CustomError("ID invalido. No se encontró un usuario", 400);
        }
        if (!doctor) { // Verificación adicional
            throw new CustomError("ID invalido. No se encontró un doctor", 400);
        }
        
        else {
            const createdAppointment = await AppointmentRepository.create(newAppointment)
            await AppointmentRepository.save(createdAppointment)

            createdAppointment.user = user
            createdAppointment.doctor = doctor
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

export const rescheduleAppointmentService = async (appointmentId: number, newDate: any, newTime: any) => {
    const appointment = await AppointmentRepository.findOneBy({id: appointmentId})

    console.log(appointment)

    if (!appointment) throw new CustomError("Turno no encontrado", 404)

    appointment.date = newDate
    appointment.time = newTime

    await AppointmentRepository.save(appointment)   
}