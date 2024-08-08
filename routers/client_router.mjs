import { Router } from 'express';

import ClientController from '../controllers/client_controller.mjs';

const clientRouter = Router();

clientRouter.use((req, res, next) => {
    if (req.session.logged) {
        next();
    } else {
        res.json({ logged: false });
    }
});

clientRouter.get('/', ClientController.all);
clientRouter.get('/:id', ClientController.one);
clientRouter.post('/', ClientController.new);
clientRouter.put('/', ClientController.edit);
clientRouter.delete('/', ClientController.remove);

export default clientRouter;