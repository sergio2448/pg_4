const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define(
     "address",
     {
       id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
         allowNull: false,
       },
       address: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
       },
       city: {
         type: DataTypes.JSON,
         allowNull: true,
       },
       state: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      country: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      cp: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      
      
     }
   );
}