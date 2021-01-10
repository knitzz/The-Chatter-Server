const { userInfo } = require('os');
const  Handler = require('./socket_util/Handler');

const server = require('http').createServer()
const io =  require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});
const clientsMap = new Map()
const chatPairMap = new Map()
const waitingList = []
const pair = []
io.on('connection',(client) => {

    const handler = new Handler(client);
    client.on('registerUser', (userInfo)=>handler.registerUserHandler(userInfo));
    client.on('createChat',()=>handler.createChatHandler());
    client.on('chat',(message)=>handler.chatHandler(message));
    client.on('disconnect', ()=>handler.disconnectHandler());
    client.on('endChat', ()=>handler.disconnectHandler());
    console.log("client " + client.id + "connected");
})




const PORT = 8000;
io.listen(PORT)
console.log(`listenig on PORT ${PORT}`)
