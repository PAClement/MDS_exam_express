import express from "express";
import planetJSON from "../public/assets/resources/planet.json" assert {type: "json"};
import planetDescriptionJSON from "../public/assets/resources/planetDescription.json" assert {type: "json"};

const homeRouter = express.Router();

homeRouter.get("/", function (req, res) {

    res.render('home', {
        title: 'Bienvenue !',
        session: req.session.user,
        planets: planetJSON.planets
    });
})

homeRouter.get("/view/:planetID", function (req, res) {

    if (req.params.planetID !== 'favicon.ico') {

        let planetDesc = {}

        planetJSON.planets.map(target =>{
            if(target.id === parseInt(req.params.planetID)){
                planetDesc = target
            }
        })

        planetDescriptionJSON.planetDescription.map(target => {
            if(target.id === parseInt(req.params.planetID)){
                planetDesc.text = target.text
            }
        })

        res.render('planet', {
            title: 'Bienvenue !',
            session: req.session.user,
            planetDesc
        });
    }
})

export default homeRouter;

