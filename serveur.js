import express from 'express'
import path from "path";
import homeRouter from './routes/home.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const port = 8080

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

app.use("/", homeRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})