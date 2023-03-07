import express from "express";
import bodyParser from "body-parser";

const adminRouter = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

adminRouter.post("/connection",urlencodedParser, function (req, res) {

    if(req.body.username === "admin" && req.body.password === "admin"){

        console.log("connection")
        res.redirect('/');
    }

})

adminRouter.get("/disconnect", function (req, res) {
    res.send('Add a book');
})
export default adminRouter;

