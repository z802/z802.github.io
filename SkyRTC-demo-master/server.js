<!--监听服务器-->
var express = require('express');
var app = express();<!--Express服务器-->
var server = require('http').createServer(app);<!--HTTP服务器-->
var SkyRTC = require('skyrtc').listen(server);
var path = require("path");

var port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static(path.join(__dirname, 'public')));<!--设置静态文件目录-->

app.get('/', function(req, res) {  <!--get路由-->
	res.sendfile(__dirname + '/index.html');
});

app.get('/bg3.jpg', function(req, res) {
	res.sendfile(__dirname + '/bg3.jpg');
});

//新用户与服务器建立WebSocket连接时触发
SkyRTC.rtc.on('new_connect', function(socket) {
	console.log('创建新连接');
});

//用户关闭连接后触发
SkyRTC.rtc.on('remove_peer', function(socketId) {
	console.log(socketId + "用户离开");
});

//用户加入房间后触发
SkyRTC.rtc.on('new_peer', function(socket, room) {
	console.log("新用户" + socket.id + "加入房间" + room);
});

//客户端向服务器端发送消息，且非自定义事件格式时触发
SkyRTC.rtc.on('socket_message', function(socket, msg) {
	console.log("接收到来自" + socket.id + "的新消息：" + msg);
});

//接收到ice candidate信令时触发
SkyRTC.rtc.on('ice_candidate', function(socket, ice_candidate) {
	console.log("接收到来自" + socket.id + "的ICE Candidate");
});

//接收到offer信令时触发
SkyRTC.rtc.on('offer', function(socket, offer) {
	console.log("接收到来自" + socket.id + "的Offer");
});

//接收到answer信令时触发
SkyRTC.rtc.on('answer', function(socket, answer) {
	console.log("接收到来自" + socket.id + "的Answer");
});

//接收到error信令时触发
SkyRTC.rtc.on('error', function(error) {
	console.log("发生错误：" + error.message);
});