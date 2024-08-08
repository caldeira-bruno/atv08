import { Sequelize } from "sequelize";

//const sequelize = new Sequelize("mysql://root:root@localhost:3306/clientesdb");
const sequelize = new Sequelize("postgresql://user_db:iSIQToo5c2ziV6eq2EJo8rV6FL8CLfBX@dpg-cqq1ffggph6c7382vbug-a/clients_eq4k");
sequelize.sync();

export default sequelize;
