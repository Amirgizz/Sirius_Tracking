let http_module = require("http");
const port = 8080;

const trackImg = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

let id_it = 0;

function HandleRequest(request, responce){
	let cookies = parseCookies(request);
	console.log(cookies);
	let url = request.url;

	let client_id = 0;

	//console.log(id_it);

	if(!cookies.server_tracking_id){
		responce.writeHead(200, {
			'Set-Cookie':'server_tracking_id=' + id_it,
			'Content-Type':'image/gif',
			'Content-Length':trackImg.length
		});
		responce.end(trackImg);

		client_id = id_it;
		id_it++;
	}else client_id = cookies.server_tracking_id;


	console.log("client #" + client_id + " has visited " + url.substring(6));

	console.log(HandleRequest);
}

function OnListen(){
	console.log("Server is listening");
}

let server = http_module.createServer(HandleRequest);
server.listen(port, OnListen);