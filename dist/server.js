"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const cors = require('cors');
const server = (0, express_1.default)();
server.use((0, morgan_1.default)('dev'));
server.use(cors());
server.use(express_1.default.json());
server.use(indexRouter_1.default);
server.use((err, req, res, next) => {
    console.log(err.statusCode);
    res.status(err.statusCode || 500).json({ error: err.message });
});
exports.default = server;
