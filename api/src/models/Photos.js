  const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define(
     "photos",
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
       photos: {
         type: DataTypes.JSON,
         allowNull: false,
       },
     },
     {
       timestamps: false,
       createdAt: false,
     }
   );
}