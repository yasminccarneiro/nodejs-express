import express, { Request, Response } from 'express'
import { create, deleteById, findAll, findById, update } from './usuario/usuario.service'

export const router = express.Router();

router.route('/usuario').get(async (req: Request, res: Response) => {
    res.send(await findAll());
})

router.route('/usuario/:id').get(async (req: Request, res: Response) => {
    res.send(await findById(+req.params.id))
})

router.route('/usuario').post(async (req: Request, res: Response) => {
    console.log(req.body)
    const { nome, email, password, admin } = req.body;
    res.send(await create(nome, email, password, admin))
})

router.route('/usuario').put(async (req: Request, res: Response) => {
    console.log(req.body)
    const { id, nome, email, password, admin } = req.body;
    res.send(await update(id, nome, email, password, admin))
})

router.route('/usuario/:id').delete(async (req: Request, res: Response) => {
    res.send(await deleteById(+req.params.id))
})