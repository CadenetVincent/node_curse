const url = require('url');
const qs = require('querystring');



const serverHandle = function (req, res) {
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  console.log(params)
  console.log(route)
  console.log(path)

  /* path /hello/home and parameter name GET = Vincent */
  if (path === '/hello/home' && params['name'] === 'Vincent') {

  	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(" <h1> Salut Moi c'est Vincent et j'adore codé</h1> ");

  } 
  /* path /hello/home and parameter name GET = ? */
  else if (path === '/hello/home' && 'name' in params) {

  	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1> Hello ' + params['name']+'</h1> ')

  }  
  /* path ? and parameter name GET = ? || null */
  else {

  	res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(' <h1> Not found sorry </h1> ')
  }

  res.end();
}

const anotherFunction = function ()
{
	return "Hello World";
}



module.exports = {
	serverHndle : serverHandle,
    testHello : anotherFunction,
}