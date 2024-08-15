"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateAndHour = void 0;
// moment tira un warning en consola, pero no hay ningún error 
const moment = require('moment');
const validateDateAndHour = (req, res, next) => {
    const { date, time } = req.body;
    const fechaMoment = moment(date);
    const horaMoment = moment(time, 'HH:mm');
    if (fechaMoment.isoWeekday() >= 6) {
        return res.status(400).json({ error: 'No se pueden programar turnos los fines de semana.' });
    }
    const horaInicioComercial = moment('09:00', 'HH:mm');
    const horaFinComercial = moment('19:00', 'HH:mm');
    if (horaMoment.isBefore(horaInicioComercial) || horaMoment.isAfter(horaFinComercial)) {
        return res.status(400).json({ error: 'Los turnos solo pueden ser programados durante el horario comercial.' });
    }
    next();
};
exports.validateDateAndHour = validateDateAndHour;
