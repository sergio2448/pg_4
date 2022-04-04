const express = require("express");
const {
    getProperties,
    updateProperties,
    setassociations,
    addassociations,
    fillProperties,
    fillPhotos,
} = require('../middlewares/PropertiesController')
// const {addphoto} = require('../middlewares/usercreate.js')
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const { uploadFile, getFileStream } = require('../middlewares/configS3')

const diskstorage = multer.diskStorage({
//  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
  //El argumento de single debe coincidir con el nombre del key en la consulta de postman
}).any("file");

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

router.post("/img/:idProperty", fileUpload, async (req, res) => {
  try {
    const {idProperty}= req.params;
    //const arrayImagenes = req.files.map(img => img.)
    // console.log(req.files);
    const file= req.files;
    const result = await uploadFile(file);
    
  // const data = fs.readFileSync(
  //   path.join(__dirname, "../images/" + req.file.filename)
  // );
  result.forEach(async element => {
    const res =await element;
    await fillPhotos(res.key,idProperty);
  })
  
  res.send({ data: "Imagen cargada" });
  } catch (error) {
    res.status(500).send({ data: "No se pudo guardar la imagen" });
  }
});

router.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

router.put('/images/:id',fileUpload, async (req, res) => {
  const {id}= req.params;
  const files= req.files;
  const resultSearch = await getProperties(id);
  resultSearch?.map(photo => photo.photos);
  if(resultSearch){
    //delete photos en DB

    //delete photos en AWS
  }

  const result = await uploadFile(file);
})


//router.put('/imagen/:key',)


//! ----------------  En contrucción----------------//
router.put('/put/:id', async (req, res) => {
    const { override } = req.query
    const { id } = req.params
    const { features /*, photos*/ } = req.body
    try {
        let values = {};
        for (let key in req.body) {
            if (key !== 'features' || key !== 'photos') {
                (req.body[key].length > 0) && (values[key] = req.body[key])
            }
        }
        
        // await addphoto(photos) //*pendiiente asociacion de fotos
        await updateProperties(values, id)
        if (override === 'true') {
            setassociations(features /*, photos*/, id)
        } else if (override === 'false') {
            await addassociations(features /*, photos*/, id)
        }
        return res.json({ status: 'update' })
    } catch (error) {
        return res.status(404).json(error)
    }

})
//! ----------------^^^^^----------------//
module.exports = router;
