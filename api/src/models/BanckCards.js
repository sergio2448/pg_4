const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define('banckCards', {
        id: {
            type: DataTypes.STRING,
            // defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "El campo no puede ser nulo"
                }
            },
        },
        purchase_units: {
            type: DataTypes.JSON,
            allowNull: true,

            get() {
                return JSON.parse(this.getDataValue('purchase_units'))
            },
            set(value) {
                return this.setDataValue("purchase_units", JSON.stringify(value));
            }
        },
        payer: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('payer'))
            },
            set(value) {
                return this.setDataValue("payer", JSON.stringify(value));
            }
        },
        links: {
            type: DataTypes.JSON,
            allowNull: true,
            get() {
                return JSON.parse(this.getDataValue('links'))
            },
            set(value) {
                return this.setDataValue("links", JSON.stringify(value));
            }
        }

    })
}