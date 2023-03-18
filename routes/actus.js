import express from "express";

const actuRouter = express.Router();

actuRouter.get("/actu",function(req, res) {

    res.render('actus', {
        title: 'Bienvenue !',
        session: req.session.user
    });
})

actuRouter.post("/actu",function(req, res) {
    res.send('Add a book');
})

export default actuRouter;

