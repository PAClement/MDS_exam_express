import express from 'express'
import path from "path";
import { fileURLToPath } from 'url';

import homeRouter from './routes/home.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 8080

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static(__dirname + 'public'))

app.use(homeRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})