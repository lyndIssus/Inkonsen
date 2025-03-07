import { DataTypes, Model } from "sequelize";

import db from "../db.js";

class debito extends Model {}

debito.init(
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
    modelName: "debito",
    tableName: "debitos",
    underscored: true,
  }
);

export default debito;
