import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalCategory } from "./MedicalCategory";
import { Appointment } from "./Appointment";

@Entity({
    name: "doctors"
})
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    location: string

    @Column()
    phone: number

    @Column()
    email: string

    @Column()
    description: string

    @Column()
    image: string

    @Column("text", { array: true })
    availableSlots: string[]
    
    @ManyToMany(() => MedicalCategory, (category) => category.doctors)
    @JoinTable() // Necesario para definir el lado propietario de la relación
    categories: MedicalCategory[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[]
}