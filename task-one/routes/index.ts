import express,{Request, Response,NextFunction} from"express";
  const router = express.Router()


/* GET home page. */
router.get("/", function (req:Request, res:Response, next:NextFunction) {
  res.render("index", { title: "Express" });
});



// import {getAll,getSingle, createData, updateData, deleteData, checkID, validation} from"../controllers/data"



// router.param("id", checkID);
// router.route("/").get(getAll).post(validation, createData)
// router.route("/:id").get(getSingle).put(validation, updateData).delete(deleteData)

export default router;


