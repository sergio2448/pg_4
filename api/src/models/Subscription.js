const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define('Subscription', {
        id: {
            type: DataTypes.STRING,
            // defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        }
    })
}