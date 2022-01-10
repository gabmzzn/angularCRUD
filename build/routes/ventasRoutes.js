"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasController_1 = __importDefault(require("../controllers/ventasController"));
class VentasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ventasController_1.default.getAll);
        this.router.get('/:id', ventasController_1.default.getOne);
        this.router.post('/', ventasController_1.default.create);
        this.router.put('/:id', ventasController_1.default.update);
        this.router.delete('/:id', ventasController_1.default.delete);
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
