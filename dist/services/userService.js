"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerNewUserService = exports.getUserService = exports.getAllUsersService = exports.CustomError = void 0;
const credentialService_1 = require("./credentialService");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield UserRepository_1.default.find({
            relations: {
                appointments: true
            }
        });
        if (allUsers)
            return allUsers;
        else
            throw new CustomError("Usuarios no encontrados", 404);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsersService = getAllUsersService;
const getUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserRepository_1.default.findOne({
            where: {
                id: userId
            },
            relations: ['appointments'],
        });
        if (user)
            return user;
        else
            throw new CustomError("Usuario no encontrado", 404);
    }
    catch (error) {
        throw error;
    }
});
exports.getUserService = getUserService;
const registerNewUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCredentials = yield (0, credentialService_1.createCredentialsService)({ username: userData.username, password: userData.password });
        const newUser = {
            name: userData.name,
            email: userData.email,
            birthdate: userData.birthdate,
            nDni: userData.nDni
        };
        const createdUser = yield UserRepository_1.default.create(newUser);
        createdUser.credential = newCredentials;
        yield UserRepository_1.default.save(createdUser);
        return createdUser;
    }
    catch (error) {
        throw new CustomError("Error al crear el usuario", 400);
    }
});
exports.registerNewUserService = registerNewUserService;
const loginUserService = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = credentials;
        const credential = yield CredentialRepository_1.default.findOne({
            where: { username }
        });
        if (!credential || credential.password !== password)
            throw new CustomError("Credenciales invalidas", 401);
        else {
            const user = yield UserRepository_1.default.findOneBy({ id: credential.id });
            const response = {
                login: true,
                user: user
            };
            return response;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.loginUserService = loginUserService;
