import { Request, Response } from 'express'

import pool from '../database'

class VentasController {
    public async getAll(req: Request, res: Response) {
        const facturas = await pool.query('SELECT facturas.id, facturas.fecha, clientes.nombre, clientes.apellido, facturas.monto FROM facturas INNER JOIN clientes ON facturas.id_cliente = clientes.id;')
        res.json(facturas)
    }

    public async getOne(req: Request, res: Response) {
        const { id } = req.params
        const factura = await pool.query('SELECT * FROM facturas WHERE id = ?', id)
        if (factura.length > 0) {
            return res.json(factura[0])
        }
    }

    public async create(req: Request, res: Response) {
        console.log(req.body)
        await pool.query('INSERT INTO facturas set ?', req.body)
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params
        await pool.query('UPDATE facturas set ? WHERE id = ?', [req.body, id])
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params
        await pool.query('DELETE FROM facturas WHERE id = ?', id)
    }

}

export const ventasController = new VentasController()
export default ventasController