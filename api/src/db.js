require('dotenv').config();
const { Sequelize,DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/inmueblesDB`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {  Roles,Users,BanckCards,Sellers,Properties,Features } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// Uno a uno 1:N:
// Un Rol puede estar asociado a varios usuario, un usuario tiene un solo rol
Roles.hasMany(Users)//, { as: "Users", foreignKey: "rolId" });
Users.belongsTo(Roles)//, { as: "account" });

// Uno a Muchos, 1:N
//un usuario  tiene Una o varias tarjetas bancarias, una tarjeta está asociadoa un solo usuario
Users.hasMany(BanckCards)//, { as: "BanckCards", foreignKey: "userId" });
BanckCards.belongsTo(Users)//, { as: "Cards" });

//Uno a uno, 1:1
//Un Vendedor tiene un usuario, una cuneta de usuario le pertence a un vendedor
Sellers.hasOne(Users)//, { as: "UsersSellers", foreignKey: "accountid" });
Users.belongsTo(Sellers)//, { as: "SellersUsers", foreignKey: "accountid"});

//uno a Muchos, 1:N
//UN vendedor publica una o muchas propiedad, una priedad le pertenece a un vendedor
Sellers.hasMany(Properties)//,{as:"Properties", foreignKey:"sellersId"});
Properties.belongsTo(Sellers)//, { as: "Homeowners" });



const Produc_Features = sequelize.define('produc_features', {
  value: DataTypes.STRING
}, { timestamps: false });

Properties.belongsToMany(Features, { through: Produc_Features });
Features.belongsToMany(Properties, { through: Produc_Features });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
