const express = require("express");
const {
    getProperties,
    updateProperties,
    setassociations,
    addassociations,
    fillProperties,
    fillPhotos,
} = require('../middlewares/PropertiesController')
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
  //El argumento de single debe coincidir con el nombre del key en la consulta de postman
}).single("file");

router.get("/", async (req, res) => {
  try {
    const {
      id,
      cost,
      address,
      city,
      state,
      country,
      cp,
      lease,
      propertyType,
      search,
    } = req.query;
    const result = await getProperties(
      id,
      cost,
      address,
      city,
      state,
      country,
      cp,
      lease,
      propertyType,
      search
    );
    if (result?.length > 0) {
      return res.json(result);
    } else {
      return res.status(404).json({ message: "No se encontraron registros" });
    }
  } catch (error) {
    console.log("Ocurrio un error en PropertiesRoute / get :" + error);
  }
});

router.post("/pro", fillProperties);

router.post("/img", fileUpload, async (req, res) => {
  const data = fs.readFileSync(
    path.join(__dirname, "../images/" + req.file.filename)
  );
  const image = await fillPhotos(data);
  res.send({ data: "Imagen cargada" });
});

router.put('/:id', async (req, res) => {
    const { override } = req.query
    const { id } = req.params
    const { features } = req.body
    try {
        let values = {};
        for (let key in req.body) {
            if (key !== 'features') {
                (req.body[key].length > 0) && (values[key] = req.body[key])
            }
        }
        await updateProperties(values, id)
        if (override === 'true') {
            setassociations(features, id)
        } else if (override === 'false') {
            await addassociations(features, id)
        }
        return res.json({ status: 'update' })
    } catch (error) {
        return res.status(404).json(error)
    }
})
module.exports = router;
