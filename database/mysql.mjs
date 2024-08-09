import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgresql://user_db:6zOlumwBKMU7o7d4APfC6jLZ98uErj7H@dpg-cqr98o5umphs73chf7mg-a/clientes_62m2");
sequelize.sync();

export default sequelize;
