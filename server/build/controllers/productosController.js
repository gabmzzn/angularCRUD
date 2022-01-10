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
exports.productosController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductosController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield database_1.default.query('SELECT productos.cod, productos.nombre, productos.precio, IFNULL(deposito.stock,0) as stock FROM productos LEFT JOIN deposito ON productos.cod = deposito.cod_producto;');
            res.json(productos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod } = req.params;
            const producto = yield database_1.default.query('SELECT * FROM productos WHERE cod = ?', cod);
            console.log(producto);
            if (producto.length > 0) {
                return res.json(producto[0]);
            }
            res.status(404).json({ message: 'El producto no existe' }); //fix
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO productos set ?', req.body);
            res.json({ message: 'Producto creado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod } = req.params;
            yield database_1.default.query('UPDATE productos set ? WHERE cod = ?', [req.body, cod]);
            res.json({ message: 'Producto fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod } = req.params;
            yield database_1.default.query('DELETE FROM productos WHERE cod = ?', [cod]);
            res.json({ message: 'Producto fue eliminado' });
        });
    }
}
exports.productosController = new ProductosController();
exports.default = exports.productosController;
