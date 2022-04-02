const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("idstatus", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    statusName: {
      type: DataTypes.STRING,
      allowNull: false,
      comentario: "Nombre de estado Ejem: ...",
      validate: {
        notNull: {
          msg: "El campo no puede ser nulo",
        },
        isAlpha: {
          args: true,
          msg: "El estado solo contiene letras",
        },
        len: {
          args: [3, 255],
          msg: "El estado debe tener entre 3 y 255 caracteres",
        },
      },
    },
  });
};
