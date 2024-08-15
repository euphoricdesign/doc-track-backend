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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.addNewAppointment = exports.getAppointment = exports.getAllAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const catchAsync_1 = require("../utils/catchAsync");
exports.getAllAppointments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield (0, appointmentService_1.getAllAppointmentsService)();
    res.status(200).json(appointments);
}));
exports.getAppointment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params.id);
    const appointment = yield (0, appointmentService_1.getAppointmentService)(appointmentId);
    res.status(200).json(appointment);
}));
exports.addNewAppointment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, description, userId } = req.body;
    const newAppointment = yield (0, appointmentService_1.addNewAppointmentService)({ date, time, description, userId });
    res.status(201).json(newAppointment);
}));
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params.id);
    yield (0, appointmentService_1.cancelAppointmentService)(appointmentId);
    res.status(200).json({ message: "Turno cancelado con éxito" });
});
exports.cancelAppointment = cancelAppointment;
