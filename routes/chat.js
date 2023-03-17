import express from "express";
import {Server} from "socket.io";

const chatRouter = express.Router();
export default function (httpServer) {

    const io = new Server(httpServer);

    let listUser = [];
    let listMessage = [];
    let listInsult = ["MERDE", "CONNARD", "ALEXIS", "TRISTAN", "ENFOIRÉ"];

    io.on('connection', (socket) => {
        let addedUser = false;
        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {

            const currentDate = new Date(Date.now()).toLocaleString()

            listInsult.map(target => {

                if (data.toUpperCase().includes(target.toUpperCase())) {
                    data = "Clément est vraiment le meilleur dev"
                }
            })

            let currentMessage = {
                username: socket.username,
                message: data,
                date: currentDate
            }

            listMessage.push(currentMessage)
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', currentMessage);
            socket.emit('new message', currentMessage);
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {

            let userAlreadyExist = false
            if (listUser.length > 0) {
                listUser.map(target => {
                    if (target.toUpperCase() === username.toUpperCase()) {

                        userAlreadyExist = true;
                    }
                })
            }

            if (!userAlreadyExist) {
                if (addedUser) return;

                // we store the username in the socket session for this client
                socket.username = username;
                addedUser = true;
                listUser.push(socket.username);
                socket.emit('login', {
                    username: socket.username,
                    listUser,
                    listMessage,
                });
                // echo globally (all clients) that a person has connected
                socket.broadcast.emit('user joined', {
                    username: socket.username,
                    listUser
                });
            } else {

                socket.emit('login', {
                    info: `Désolé ! Le pseudo <span class="fw-bold">${username}</span> est déjà pris !`
                });
            }


        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', () => {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', () => {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
            if (addedUser) {

                listUser = listUser.filter(e => e !== socket.username);

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    listUser
                });
            }
        });

    });


    chatRouter.get("/chat", function (req, res) {

        res.render('chat', {
            title: 'Bienvenue sur le chat !'
        });
    })

    return chatRouter
}

