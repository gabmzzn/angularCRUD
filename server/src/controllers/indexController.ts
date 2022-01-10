import { Request, Response } from 'express'

class IndexConroller {
    public index(req: Request, res: Response) {
        res.send('Hello')
    }
}

export const indexController = new IndexConroller()