import express from "express";
import path from "path";
import {fileURLToPath} from "url";

const downloadRouter = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

downloadRouter.get('/download', function (req, res) {
    const file = `${__dirname}/../public/assets/resources/planetDiscovery.pdf`;
    res.download(file); // Set disposition and send it.
});

export default downloadRouter;

