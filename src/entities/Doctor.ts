import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalCategory } from "./MedicalCategory";

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
    
    @ManyToMany(() => MedicalCategory, (category) => category.doctors)
    @JoinTable() // Necesario para definir el lado propietario de la relación
    categories: MedicalCategory[];
}