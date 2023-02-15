import express from "express";

const homeRouter = express.Router();

homeRouter.get(function(req, res) {
    res.render('index', {
        title: 'Express Login'
    });
})

homeRouter.post(function(req, res) {
    res.send('Add a book');
})

export default homeRouter;

