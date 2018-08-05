import {Response} from "express";
import * as http from "http";
import * as express from "express";
import {json} from "body-parser";
import {constants} from "http2";
import {Logger} from "./Logger";
import socket from "socket.io"

const app = express.default();
app.use(json());
const logger = new Logger();
const addCors = (res: Response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
};

const io = socket(http, {origins: "*"});

app.options("*", (req, res) => {
    addCors(res);
    res.sendStatus(constants.HTTP_STATUS_NO_CONTENT);
});

app.post("/logs", (req, res) => {
    if (!Logger.valid(req.body)) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST);
        res.json({message: "log not valid"});
        return;
    }
    addCors(res);
    // also emit in io
    io.emit("data", {tag: req.body.tag, message: req.body.message, level: req.body.level});
    logger.addLog(req.body.tag, req.body.message, req.body.level);
    res.status(constants.HTTP_STATUS_CREATED);
    res.json({result: "success"});
});

app.get("/logs", (req, res) => {
    addCors(res);
    res.json({data: logger.getAllLogs()});
});


io.on("connection", () => {
    console.info("client is connected");
});
const server = http.createServer(app);
io.listen(server);
server.listen(9999, () => {
    console.info("listening on localhost:9999")
});
