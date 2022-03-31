const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('sellers',{
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
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            },
        pc:{
            type: DataTypes.INTEGER,
            allowNull:false,
            },

   })
}