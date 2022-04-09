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
           allowNull:false,
           validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            },
            len: {
                args: [3, 255],
                msg: "El nombre tiene que ser entre 3 y 255 caracteres"
            }
        },
       },
       email:{
        type: DataTypes.STRING,
        allowNull:true,
       },
       image:{
        type: DataTypes.STRING,
        allowNull:true,
       }
   })
}