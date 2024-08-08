import { Router } from 'express';

import LoanController from '../controllers/loan_controller.mjs';

const loanRouter = Router();

loanRouter.use((req, res, next) => {
    if (req.session.logged) {
        next();
    } else {
        res.json({ logged: false });
    }
});

loanRouter.get('/', LoanController.all);
loanRouter.get('/:id', LoanController.one);
loanRouter.post('/', LoanController.new);
loanRouter.put('/', LoanController.edit);
loanRouter.delete('/', LoanController.remove);

export default loanRouter;

