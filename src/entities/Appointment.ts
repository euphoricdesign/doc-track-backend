import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Doctor } from "./Doctor";



export enum AppointmentStatus { // variables/constantes
    Active = "active",
    Cancelled = "cancelled"
}

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    date: string

    @Column({
        length: 100
    })
    time: string

    @Column({default: AppointmentStatus.Active})
    status: AppointmentStatus

    @ManyToOne(() => User, (user) => user.appointments)
    user: User

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
    doctor: Doctor
}