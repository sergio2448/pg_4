const express = require("express");
const { getProperties, fillProperties } = require("../controller/PropertiesController");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { precio } = req.params;
    const result = await getProperties();
    if (result?.length > 0) {
      return res.json(result);
    } else {
      return res.status(404).json({ message: "No se encontraron registros" });
    }
  } catch (error) {
    console.log("Ocurrio un error en PropertiesRoute / get :" + error);
  }
});

router.post("/properties", fillProperties);

module.exports = router;
