const { DataTypes} = require('sequelize');

module.exports =  (sequelize) => {
   sequelize.define('roles',{
       id:{
           type: DataTypes.UUID,
           defaultValue: DataTypes.UUIDV4,
           primaryKey:true,
           allowNull:false,
       },
       rolName:{
           type: DataTypes.STRING,
           allowNull:false,
           comentario: 'Nombre de  rol Ejem: Vendedor, cliente, Adm, etc',
           validate: {
               notNull: {
                   msg: "El campo no puede ser nulo"
               },
               isAlpha: {
                   args: true,
                   msg: "El rol solo puede contener letras"
               },
               len: {
                   args: [3, 255],
                   msg: "El rol tiene que ser entre 3 y 255 caracteres"
               }
           },
       },

   })
}