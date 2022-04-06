const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define(
     "reviws",
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
        allowNull: false,
      },
     },
     {
       timestamps: false,
       createdAt: false,
     }
   );
}