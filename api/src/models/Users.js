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
            isAlpha: {
                args: true,
                msg: "El nombre solo puede contener letras"
            },
            len: {
                args: [3, 255],
                msg: "El nombre tiene que ser entre 3 y 255 caracteres"
            }
        },
       },
       password:{
        type: DataTypes.STRING,
        allowNull:false
       }
   })
}