const { Router } = require("express");
const { postReview, deleteReview } = require("../middlewares/ReviewMidd");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { comment, rating, buyerId, propertyId } = req.body;
    const createReview = await postReview(comment, rating, buyerId, propertyId);
    createReview?.dataValues
      ? res.status(200).json(createReview?.dataValues)
      : res.status(404).json({ message: "No se pudo crear el comentario" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resDelete = await deleteReview(id);
    if (resDelete > 0) {
      res.status(204).send("Se eliminó exitosamente el id: " + id);
    } else {
      res.status(500).send("No se encontro el recuros");
    }
  } catch (error) {
    console.log("Ocurrio un error en Review/ delete :" + error);
  }
});

module.exports = router;
