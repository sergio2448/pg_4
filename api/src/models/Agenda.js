const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('agenda', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dates: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        hours: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        propertyId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
    })
}