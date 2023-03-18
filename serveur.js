import express from 'express'
import path from "path";
import {fileURLToPath} from 'url';
import http from 'http';

import homeRouter from './routes/home.js'
import chatRouter from "./routes/chat.js";
import adminRouter from "./routes/admin.js";
import session from "express-session";
import actuRouter from "./routes/actus.js";
import downloadRouter from "./routes/download.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 8080;

const httpServer = http.createServer(app);

app
    .set('views', './views')
    .set('view engine', 'ejs')

    //resources
    .use('/boostrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
    .use(express.static(__dirname + '/public'))
    .use(session({
        name: `clement-session`,
        secret: '51518815441177',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // This will only work if you have https enabled!
            maxAge: 60000 // 1 min
        }
    }))
    //route
    .use(homeRouter)
    .use(chatRouter(httpServer))
    .use(adminRouter)
    .use(actuRouter)
    .use(downloadRouter)

    //404 route
    .get('*', function (req, res) {
        res.render('404', {
            title: 'Page non trouvée :(',
            session: req.session.connected
        });
    });

//listenServer
httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});