const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("buyers", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false,
  },
  firstName:{
      type: DataTypes.STRING,
      allowNull:false,
  },
  lastName:{
       type: DataTypes.STRING,
       allowNull:false,
   },
   phoneNumber:{
       type: DataTypes.STRING,
       allowNull:true,
   },
   dateBirth:{
       type: DataTypes.DATE,
       allowNull:true,
   },
  });
};
