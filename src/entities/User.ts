import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    email: string
    
    @OneToOne(() => Credential)
    credential: Credential

    @OneToMany(() => Appointment, (appointment: Appointment) => appointment.user)
    appointments: Appointment[]
}