import express from 'express';
import session from 'express-session';
import sequelize from './database/mysql.mjs';
import CSS from 'connect-session-sequelize';

import userRouter from './routers/user_router.mjs';
import clientRouter from './routers/client_router.mjs';
import loanRouter from './routers/loan_router.mjs';

const app = express();
const port = 3000;

const SequelizeStore = CSS(session.Store);

app.use(
    session({
        secret: '#7UIERU933E00LERI##327345&6',
        store: new SequelizeStore({
            db: sequelize
        })
    })
);

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/clients', clientRouter);
app.use('/loans', loanRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})