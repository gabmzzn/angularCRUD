import { Request, Response } from 'express'

import pool from '../database'

class ProductosController {
    public async getAll(req: Request, res: Response) {
        const productos = await pool.query('SELECT productos.cod, productos.nombre, productos.precio, IFNULL(deposito.stock,0) as stock FROM productos LEFT JOIN deposito ON productos.cod = deposito.cod_producto;')
        res.json(productos)
    }

    public async getOne(req: Request, res: Response) {
        const { cod } = req.params
        const producto = await pool.query('SELECT * FROM productos WHERE cod = ?', cod)
        console.log(producto)
        if (producto.length > 0) {
            return res.json(producto[0])
        }
        res.status(404).json({ message: 'El producto no existe' }) //fix
    }

    public async create(req: Request, res: Response) {
        console.log(req.body)
        await pool.query('INSERT INTO productos set ?', req.body)
        res.json({ message: 'Producto creado' })
    }

    public async update(req: Request, res: Response) {
        const { cod } = req.params
        await pool.query('UPDATE productos set ? WHERE cod = ?', [req.body, cod])
        res.json({ message: 'Producto fue actualizado' })
    }

    public async delete(req: Request, res: Response) {
        const { cod } = req.params
        await pool.query('DELETE FROM productos WHERE cod = ?', [cod])
        res.json({ message: 'Producto fue eliminado' })
    }

}

export const productosController = new ProductosController()
export default productosController