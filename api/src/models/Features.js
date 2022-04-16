const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('features',{
       id:{
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey:true,
           allowNull:false,
       },
       name:{
           type: DataTypes.STRING,
           allowNull:false,
       },
       isNumerable:{
           type:DataTypes.BOOLEAN,
           allowNull:false,
           defaultValue: false
       }
   },{
    timestamps: false,
    createdAt: false,
  })
}