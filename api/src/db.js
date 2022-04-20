require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      })
    : /* new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      }) */
      new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/inmueblesDB`,
        { logging: false, native: false }
      );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Roles, Users, BanckCards, Sellers, Properties, Features, Photos, Buyers, Sales, Reviews, Address, Calendar, Agenda, Idstatus, Favorite, Subscription, BannedUsers, PromotionDetails } =
  sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// Uno a uno 1:N:
// Un Rol puede estar asociado a varios usuario, un usuario tiene un solo rol

Roles.hasMany(Users);
Users.belongsTo(Roles);

// Uno a Muchos, 1:N
//un usuario  tiene Una o varias tarjetas bancarias, una tarjeta está asociadoa un solo usuario
Users.hasMany(BanckCards);
BanckCards.belongsTo(Users);

//Uno a uno, 1:1
//un usuario le pertenece a un vendedro, un vendedor tiene una cuenta de usuario
Users.hasMany(Sellers, { onDelete: "CASCADE" });
Sellers.belongsTo(Users);

//uno a Muchos, 1:N
//UN vendedor publica una o muchas propiedad, una priedad le pertenece a un vendedor
Sellers.hasMany(Properties, { onDelete: "CASCADE" });
Properties.belongsTo(Sellers);

//una a Muchos, 1:N
//una propiedad tiene muchas imagens, una imagen le pertence a una proiedad
Properties.hasMany(Photos);
Photos.belongsTo(Properties);

//Uno a muchos, 1:N
//Un usuario puede adquirir una o más propiedades, una propiedad sólo puede ser comprada por un usuario
Buyers.hasMany(Sales);
Sales.belongsTo(Buyers);

//Uno a uno, 1:1
//Un Comprador tiene un usuario, una cuenta de usuario le pertenece a un comprador
Users.hasMany(Buyers, { onDelete: "CASCADE" });
Buyers.belongsTo(Users);


const Produc_Features = sequelize.define(
  "produc_features",
  {
    value: DataTypes.STRING,
  },
  { timestamps: false }
);

Properties.belongsToMany(Features, { through: Produc_Features });
Features.belongsToMany(Properties, { through: Produc_Features });

// Properties.hasMany(Produc_Features);
// Produc_Features.belongsTo(Features);


//Uno a uno, 1:1
//Un Cliente puede hacer un solo camentario, un comentario pertenece a un cliente
Buyers.hasOne(Reviews, { onDelete: "CASCADE" })
Reviews.belongsTo(Buyers)

//Uno a Muchos, 1:N
//Un comentario pertenece a un departamente, un departamento tiene muchos comentarios
Properties.hasMany(Reviews, { onDelete: "CASCADE" });
Reviews.belongsTo(Properties);



Buyers.hasOne(Address, { foreignKey: { allowNull: true }, onDelete: "CASCADE" });
Address.belongsTo(Buyers, { foreignKey: { allowNull: true } })


Sellers.hasOne(Address, { foreignKey: { allowNull: true }, onDelete: "CASCADE" });
Address.belongsTo(Sellers, { foreignKey: { allowNull: true } })


//Uno a muchos, 1:N
//Un usuario puede adquirir una o más propiedades, una propiedad sólo puede ser comprada por un usuario
Properties.hasMany(Sales);
Sales.belongsTo(Properties);


//Uno a muchos, 1:N
//Una porpiedad puede puede ser agendada una o varias veces, un cita le petenece a una propiedad
Properties.hasMany(Calendar, { foreignKey: { allowNull: true }, onDelete: "CASCADE" });
Calendar.belongsTo(Properties, { foreignKey: { allowNull: true } });

//Uno a muchos, 1:N
//Un usurio puede agendada una o varias veces, un cita le petenece a una un usuario
Users.hasMany(Calendar, { onDelete: "CASCADE" });
Calendar.belongsTo(Users);

//una cita tiene una sola cita 
// Agenda.hasMany(Calendar);
// Calendar.belongsTo(Agenda);
Sellers.hasMany(Agenda);
Agenda.belongsTo(Sellers);
Buyers.hasMany(Agenda);
Agenda.belongsTo(Buyers);

//uno a muchos, 1:N
// una propiedad tiene un estado, un estado lo tiene uno o mas Propiedades
Idstatus.hasMany(Properties);
Properties.belongsTo(Idstatus);


Buyers.hasMany(Favorite, { onDelete: "CASCADE" });
Favorite.belongsTo(Buyers)

Properties.hasMany(Favorite, { onDelete: "CASCADE" });
Favorite.belongsTo(Properties);

//Muchos a muchos 1:1
//Un Usuario puede tener un Id de subscripción, un Id de subscripción solo puede ser adquirida por un usuario

Users.hasOne(Subscription);
Subscription.belongsTo(Users)

Calendar.hasMany(Calendar, { foreignKey: { allowNull: true } });
Calendar.belongsTo(Calendar, { foreignKey: { allowNull: true } });

// Uno a uno 1:N:
// Un Rol puede estar asociado a varios usuario baneado, un usuario baneado tiene un solo rol
Roles.hasMany(BannedUsers);
BannedUsers.belongsTo(Roles);


//Uno a uno 1:1
//Una propiedad tiene una promoción y una promoción es a una propiedad
Properties.hasOne(PromotionDetails, { onDelete: 'CASCADE' });
PromotionDetails.belongsTo(Properties);

//Uno a uno 1:1
//Un detalle de promocion está asociado a una orden de paypal y una orden de paypal esta asociado a un detalle de promoción
PromotionDetails.hasOne(BanckCards)
BanckCards.belongsTo(PromotionDetails)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Produc_Features,
};
