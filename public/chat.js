window.onload = function() {
	var messages = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("sendButton");
	var content = document.getElementById("content");
	var name = document.getElementById("name");
	
	
	socket.on('message', function(data) {
		if(data.message){
			messages.push(data.message);
			var html = '';
			for(var i = 0; i<messages.length; i++ ){
				html += '<b>' + (messages[i].username ? messages[i].username:'Server') + '</b>'
				html += messages[i].message + '<br/>';
			}
			content.innerHTML = html;
		} else {
			console.log("There is a problem: ", data);
		}
	});
	
	sendButton.onclick = sendMessage =function(){
		if(name.value == ""){
			alert("Please Type your name!");
		} else {
			var text = field.value;
			socket.emit('send',{message: text, username: name.value});
		}
	}
}

$(document).ready(function(){
	$("#field").keyup(function(e){
		if(e.keycode == 13){
			sendMessage();
		}
	});

});