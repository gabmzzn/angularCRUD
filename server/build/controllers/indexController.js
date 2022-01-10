"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexConroller {
    index(req, res) {
        res.send('Hello');
    }
}
exports.indexController = new IndexConroller();
