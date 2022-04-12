const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('calendar',{
       id:{
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey:true,
           allowNull:false,
       },
       date:{
           type: DataTypes.JSONB,
           allowNull:false,
       },
       role:{
        type: DataTypes.STRING,
        allowNull:false
       }
   },{
    timestamps: false,
    createdAt: false,
  })
}