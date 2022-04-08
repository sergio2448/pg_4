const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('properties', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        m2: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        cp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lease: {
            type: DataTypes.STRING,
            allowNull: false,
            validator: {
                isIn: ["Rent", "Sale"]
            }
        },
        propertyType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        highlighted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        statuspromotion: {
            type: DataTypes.STRING,
            defaultValue: false,
        }
    })
}
