"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const isValidId = (value) => {
    const regex = /^\d+$/;
    return regex.test(value);
};
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidId(id)) {
        next({ message: 'Id invalido', statusCode: 400 });
    }
    else {
        next();
    }
};
exports.validateId = validateId;
