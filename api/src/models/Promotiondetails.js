const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define('promotionDetails', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        tiempo: {
            type: DataTypes.STRING,
            allowNull: false
        }
        ,
        startDate: {
            type: DataTypes.STRING,
            allowNull: false,
            
        }

    })
}