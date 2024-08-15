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
exports.cancelAppointmentService = exports.addNewAppointmentService = exports.getAppointmentService = exports.getAllAppointmentsService = void 0;
const Appointment_1 = require("../entities/Appointment");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const AppointmentRepository_1 = __importDefault(require("../repositories/AppointmentRepository"));
const userService_1 = require("./userService");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointments = AppointmentRepository_1.default.find({
            relations: {
                user: true
            }
        });
        if (allAppointments)
            return allAppointments;
        else
            throw new userService_1.CustomError("Turnos no encontrados", 404);
    }
    catch (error) {
        throw error;
    }
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield AppointmentRepository_1.default.findOne({
            where: { id: appointmentId },
            relations: ['user']
        });
        if (appointment)
            return appointment;
        else
            throw new userService_1.CustomError("Turno no encontrado", 404);
    }
    catch (error) {
        throw error;
    }
});
exports.getAppointmentService = getAppointmentService;
const addNewAppointmentService = (newAppointment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserRepository_1.default.findOneBy({ id: newAppointment.userId });
        if (!user)
            throw new userService_1.CustomError("ID invalido. No se encontro un usuario", 400);
        else {
            const createdAppointment = yield AppointmentRepository_1.default.create(newAppointment);
            yield AppointmentRepository_1.default.save(createdAppointment);
            createdAppointment.user = user;
            yield AppointmentRepository_1.default.save(createdAppointment);
            return createdAppointment;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.addNewAppointmentService = addNewAppointmentService;
const cancelAppointmentService = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppointmentRepository_1.default.findOneBy({ id: appointmentId });
    if (!appointment)
        throw new userService_1.CustomError("Turno no encontrado", 404);
    else {
        appointment.status = Appointment_1.AppointmentStatus.Cancelled;
        yield AppointmentRepository_1.default.save(appointment);
    }
});
exports.cancelAppointmentService = cancelAppointmentService;
