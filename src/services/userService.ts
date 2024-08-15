import UserDto from "../dto/userDto"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { createCredentialsService } from "./credentialService"
import UserRepository from "../repositories/UserRepository"
import CredentialRepository from "../repositories/CredentialRepository"



export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }

export const getAllUsersService = async (): Promise<User[]> => {
    try {
        const allUsers: User[] = await UserRepository.find({
            relations: {
                appointments: true
            }
        })
        if (allUsers) return allUsers
        else throw new CustomError("Usuarios no encontrados", 404)
    } catch (error) {
        throw error

    }
}

export const getUserService = async (userId: number): Promise<User | null> => {
    try {
        const user = await UserRepository.findOne({
            where: {
              id: userId 
            },
            relations: ['appointments'], 
          });
        if (user) return user
        else throw new CustomError("Usuario no encontrado", 404)
    } catch (error) {
        throw error;
    }
}

export const registerNewUserService = async (userData: UserDto): Promise<User> => {
    try {
        const newCredentials: Credential = await createCredentialsService({ username: userData.username, password: userData.password })

        const newUser = {
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni
        }
        
        const createdUser: User = await UserRepository.create(newUser)
    
        createdUser.credential = newCredentials
        await UserRepository.save(createdUser)
        return createdUser
    } catch (error) {
        throw new CustomError("Error al crear el usuario", 400)
    }
}

export const loginUserService = async (credentials: any) => { //* Ver de crear un DTO para esto 
    try {
        const { username, password } = credentials
        const credential = await CredentialRepository.findOne({
            where: { username }
        })
    
        if (!credential || credential.password !== password) throw new CustomError("Credenciales invalidas", 401)
        else {
            const user = await UserRepository.findOneBy({id: credential.id})
            const response = {
                login: true,
                user: user
            }
            return response
        }
    } catch (error) {
        throw error
    }
}