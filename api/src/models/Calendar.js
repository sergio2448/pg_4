const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('calendar',{
       id:{
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey:true,
           allowNull:false,
       },
       dates:{
           type: DataTypes.JSONB,
           allowNull:false,
       },
       hour:{
        type: DataTypes.DATE,
        allowNull:true,
       },
       type:{
        type: DataTypes.STRING,
        allowNull:false
       }
   },{
    timestamps: false,
    createdAt: false,
  })
}