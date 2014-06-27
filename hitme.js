//stress_test.js

var readline = require('readline');
var net = require('net');
var i;
var clients = [];
for (i=0; i<2000; i++){
	var client = net.connect({port: 8080},
	    function() { //'connect' listener
	  console.log('client connected');
	});

	client.on('data', function(data) {
	 // console.log(data.toString());
	});

	client.on('end', function() {
	  console.log('client disconnected');
	  
	});

	clients.push(client);

}



var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

setInterval(function(){
	rl.question("Kill a client ", function(answer) {
		   clients[--i].end();
		  rl.close();
		
	});
},5000);
