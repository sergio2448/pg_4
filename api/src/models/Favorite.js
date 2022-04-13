const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('favorite',{
       id:{
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey:true,
           allowNull:false,
       },
       favorite:{
           type: DataTypes.BOOLEAN,
           allowNull:false,
           defaultValue: true
       }
   },{
    timestamps: false,
    createdAt: false,
  })
}