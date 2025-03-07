import { DataTypes, Model } from "sequelize";

import db from "../db.js";

class credito extends Model {}

credito.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "credito",
    tableName: "creditos",
    underscored: true,
  }
);

export default credito;
