const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define(
     "reviews",
     {
       id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
         allowNull: false,
       },
       order: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
       },
       comment: {
         type: DataTypes.STRING,
         allowNull: false,
       },
       rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
     }
   );
}