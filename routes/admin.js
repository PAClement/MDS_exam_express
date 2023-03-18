import express from "express";
import bodyParser from "body-parser";

const adminRouter = express.Router();
const urlencodedParser = bodyParser.urlencoded({extended: false})

adminRouter.post("/connection", urlencodedParser, function (req, res, next) {

    if (req.body.username === "admin" && req.body.password === "admin") {

        console.log("connection")

        // store user information in session, typically a user id
        req.session.user = "ok"

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
            res.render('home', {title: 'Bienvenue !', session: req.session.user})
        })
    } else {
        console.log("identifiant not good")
        res.render('home', {title: 'Bienvenue !', session: false})
    }

})

adminRouter.get("/disconnect", function (req, res, next) {
    req.session.connected = null
    req.session.save(function (err) {
        if (err) next(err)

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
})
export default adminRouter;

