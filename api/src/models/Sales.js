const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("sales", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  });
};
