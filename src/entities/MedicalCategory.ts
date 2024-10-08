import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";

@Entity()
export class MedicalCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Doctor, (doctor: Doctor) => doctor.categories)
    doctors: Doctor[];
}