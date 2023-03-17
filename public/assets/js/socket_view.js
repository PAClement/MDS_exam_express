let socket = io();

let message = document.querySelector('#listMessage');
let formSendMessage = document.querySelector('#chatForm');
let formSetUsername = document.querySelector('#formUsername');

let connected = false;

/**
 * Container
 */
const chatContent = document.querySelector('#chatContent');
const setUsernameContent = document.querySelector('#setUsernameContent');

/**
 * toast
 */
const toastLiveExample = document.querySelector('#liveToast')

/**
 * UserInfo
 */
let currentUsername = "";
let userList = [];
let totalUser = 0;

const init = () => {

    if (connected) {
        chatContent.className = "d-flex justify-content-between gap-2 mb-5";
        setUsernameContent.className = "d-none";
    } else {
        setUsernameContent.className = "d-block";
        chatContent.className = "d-none";
    }
}
const setUsername = (username) => {
    if (username) {
        currentUsername = username
        socket.emit('add user', username)

    }
}

const sendMessage = message => {

    if (message && connected) {
        socket.emit('new message', message);
    }
}
const setMessage = (msg) => {

    document.querySelector('#chatInput').value = "";
    let text = "";
    if (msg.username === currentUsername) {
        text = `<div class="d-flex flex-column align-items-end">
                    <h6><span class="text-danger">${msg.username}</span> <span style="font-size: 10px">(vous)</span></h6>
                    <div class="w-50 bg-secondary rounded">
                        <p class="text-white p-1 m-0">${msg.message}</p>
                    </div>
                    <h6 style="font-size: 10px" class="text-secondary">${msg.date}</h6>
                </div>`

    } else {
        text = `<div>
                    <h6>${msg.username}</h6>
                    <div class="w-50 bg-info rounded">
                        <p class="text-white p-1 m-0">${msg.message}</p>
                    </div>
                    <h6 style="font-size: 10px" class="text-secondary">${msg.date}</h6>
                </div>`
    }

    message.innerHTML += text;
    message.scrollTo(0, message.scrollHeight);
}

const getUsersList = (userTab) => {
    let buffer = ""
    userTab.map(target => {

        buffer += `<h6>${target}</h6>`;
    })
    document.querySelector('#listUserContainer').innerHTML = buffer;
    document.querySelector('#totalUser').innerHTML = `${userTab.length} Utilisateur${userTab.length > 1 ? 's connectés' : ' connecté'}`;
}

//second parameter : true for join and false for left
const userJoinOrLeft = (user, state) => {

    message.innerHTML += `<p class="text-secondary text-center">${user} a ${state ? "rejoint" : "quitté"} la conversation</p>`;
}

//FORM SET USERNAME
formSetUsername.addEventListener('submit', function (e) {
    e.preventDefault();
    setUsername(e.target[0].value)
})

//FORM SEND MESSAGE
formSendMessage.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage(e.target[0].value)
});


socket.on('new message', data => {
    setMessage(data)
})

// Whenever the server emits 'login'
socket.on('login', (data) => {

    //check if user have same pseudo
    if(typeof data.info === 'undefined'){
        connected = true;
        totalUser++;
        init()
        getUsersList(data.listUser)
        if(data.listMessage.length > 0){
            data.listMessage.map(target =>{
                setMessage(target)
            })
        }
        message.innerHTML += '<p class="text-secondary text-center">Bienvenue dans la conversation </p>'
    }else{
        const toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
        document.querySelector('#toastContent').innerHTML = data.info
    }
});

// Whenever the server emits 'user joined'
socket.on('user joined', (data) => {

    userList.push(data.username)
    getUsersList(data.listUser)
    userJoinOrLeft(data.username, true)

});

// Whenever the server emits 'user left'
socket.on('user left', (data) => {
    totalUser--;
    getUsersList(data.listUser)
    userJoinOrLeft(data.username, false)
});

init();