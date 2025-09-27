const express2 = require("express");
const { fetchAlumni } = require("../controller/alumniController");
const { protect } = require("../middlewares/authMiddleware");

const alumniRouter = express2.Router();

//ANCHOR - set middleware

alumniRouter.get("/get-alumni",protect,fetchAlumni);

alumniRouter.post("/profile");
alumniRouter.get("/me");
alumniRouter.get("/search");

module.exports = alumniRouter;
