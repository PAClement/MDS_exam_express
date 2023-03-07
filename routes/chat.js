import express from "express";
import {Server} from "socket.io";

const chatRouter = express.Router();
export default function(httpServer){

    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })

        socket.on('chat message', function(msg){
            console.log('message recu '+msg)
            io.emit('chat message', msg);
        })

    });


    chatRouter.get("/chat", function (req, res) {

        res.render('chat', {
            title: 'Bienvenue sur le chat !'
        });
    })

    return chatRouter
}

