import express from 'express'
import path from "path";
import {fileURLToPath} from 'url';
import http from 'http';

import homeRouter from './routes/home.js'
import chatRouter from "./routes/chat.js";
import adminRouter from "./routes/admin.js";

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

    //route
    .use(homeRouter)
    .use(chatRouter(httpServer))
    .use(adminRouter)

    //404 route
    .get('*', function (req, res) {
        res.render('404', {
            title: 'Page non trouvée :('
        });
    });

//listenServer
httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});