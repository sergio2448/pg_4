const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('Proerties',{
       id:{
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey:true,
           allowNull:false,
       },
       description:{
           type: DataTypes.STRING,
           allowNull:true,
       },
       m2:{
            type: DataTypes.DECIMAL,
            allowNull:false,
        },
        country:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        cost:{
            type: DataTypes.DECIMAL,
            allowNull:false,
            },

   })
}