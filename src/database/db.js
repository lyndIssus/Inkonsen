import { Sequelize } from "sequelize";

const sequelize = new Sequelize("DatabaseName", "User", "Password", {
  host: "Host",
  dialect: "Dialect",
});

export default sequelize;