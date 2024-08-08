import sequelize from "../database/mysql.mjs";
import { DataTypes } from "sequelize";

const Client = sequelize.define("Client", {
    nome: DataTypes.STRING,
    profissao: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING
});

export default Client;