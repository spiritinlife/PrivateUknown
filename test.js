//index.js

var cluster  = require('cluster');
var net = require('net');
var numCPUS = require('os').cpus().length;


if(cluster.isMaster)
{
	console.log("I am going to open " + numCPUS + " workers!");

	for ( var i = 0;  i< numCPUS; i++){
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
      setTimeout(function () { cluster.fork(); }, 2000);
    });

    cluster.on('listening', function(worker, address) {
     console.log('worker ' + worker.process.pid + ' listening');
    });

}
else
{
	console.log("Forked worker: " + cluster.worker.id);
	var server = net.createServer(function(socket){
		//console.log("Client opened");
		var interval = setInterval(function(){
			socket.write("Open or whatever\n");
		},1000);

		socket.on("end",function(data){
			console.log("Closing socket");
			clearInterval(interval);
		});
        socket.on('close', function(data) {
          console.log("Client closed")
		  clearInterval(interval);
        });
  	}).listen(8080);
	

}






/*var express = require('express');


var app = express();



app.set('port',process.env.PORT || 3000);


app.get('/',function(req,res){
	res.writeHead(200);
	res.write("Hello there");
	res.end();
});





app.listen(app.get('port'));
console.log("Devices  Server on port:" + app.get('port') + " and process:"+process.pid);


*/






















