const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('users',{
       id:{
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey:true,
           allowNull:false
       },
       name:{
           type: DataTypes.STRING,
           allowNull:true,
       },
       email:{
        type: DataTypes.STRING,
        allowNull:true,
       },
       image:{
        type: DataTypes.STRING,
        allowNull:true,
       },
       isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

   })
}