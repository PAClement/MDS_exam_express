import express from "express";

const homeRouter = express.Router();

homeRouter.get("/",function(req, res) {
    res.render('home', {
        title: 'Bienvenue !'
    });
})

homeRouter.post("/",function(req, res) {
    res.send('Add a book');
})

export default homeRouter;

