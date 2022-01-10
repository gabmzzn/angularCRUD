import { Router } from 'express'

import productosController from '../controllers/productosController'

class ProductosRoutes {

    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/', productosController.getAll)
        this.router.get('/:cod', productosController.getOne)
        this.router.post('/', productosController.create)
        this.router.put('/:cod', productosController.update)
        this.router.delete('/:cod', productosController.delete)
    }

}

const productosRoutes = new ProductosRoutes()
export default productosRoutes.router