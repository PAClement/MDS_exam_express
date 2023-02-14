import express from "express";

const router = express.Router();

router.get(function(req, res) {
    res.render('index', {
        title: 'Express Login'
    });
})

router.post(function(req, res) {
    res.send('Add a book');
})

export default router;

