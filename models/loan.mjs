import sequelize from "../database/mysql.mjs";
import { DataTypes } from "sequelize";
import Client from "./client.mjs";

const Loan = sequelize.define('Loan', {
    nome: DataTypes.STRING,
    valor: DataTypes.DECIMAL(10, 2),
    inicio: DataTypes.DATEONLY,
    fim: DataTypes.DATEONLY
});

Loan.belongsTo(Client);

export default Loan;

