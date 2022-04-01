const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define('banckCards',{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false
        },
        holderName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notNull: {
                    msg: "El campo no puede ser nulo"
                }
            },
        },
        cardNumber:{
            type: DataTypes.BIGINT,
            allowNull:false,
            validate: {
                notNull: {
                    msg: "El campo no puede ser nulo"
                }
            }
        },
        expirationDate:{
            type:DataTypes.STRING,
            allowNull:false,
            validate: {
                notNull: {
                    msg: "El campo no puede ser nulo"
                }
            }
        },
        cvv:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate: {
                notNull: {
                    msg: "El campo no puede ser nulo"
                }
            }
        },
    })
}