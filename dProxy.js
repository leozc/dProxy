var sys = require("sys");
var http = require('http');
var httpProxy = require('http-proxy');
var PROXYPORT = 8081;

var count = 0;
var errorcount =0;
process.on('uncaughtException', function(err) {
   errorcount++;
   console.log("Exception-"+errorcount+"=>"+ err);
});
httpProxy.createServer(function (request, response, proxy) {
   var hostAndPort = request.headers['host'].split(":");
   var hostname = hostAndPort[0];
   var portnumber = 80;
   count++;
   console.log(request);
   if (hostAndPort.length > 1){
      var portnumber = hostAndPort[1];
   }
  
   sys.debug("ProxyReq-"+count+":hostname=" +  hostname + " port=" +portnumber + " url:"+request.url + " Method:"+request["method"]);
   proxy.proxyRequest(request, response, {host: hostname,port:portnumber});
 
}).listen(PROXYPORT);
