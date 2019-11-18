// Import a module
const http = require('http')
const hdls = require('./handles')


http.createServer(hdls.serverHndle).listen(8083)


/*

//EXERCISE 1 18/11/2019 Create 3 different root with access dependant to name (Vincent)

const serverHandle = function (req, res) {
  const route = url.parse(req.url)
  const path = route.pathname 
  const params = qs.parse(route.query)

  console.log(params)
  console.log(route)
  console.log(path)

  if (path === '/hello/home' && params['name'] === 'Vincent') {

  	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(" <h1> Salut Moi c'est Vincent et j'adore codé</h1> ");

  } else if (path === '/hello/home' && 'name' in params) {

  	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1> Hello ' + params['name']+'</h1> ')

  }  else {

  	res.writeHead(404, {'Content-Type': 'text/html'});
    res.write(' <h1> Not found sorry </h1> ')
  }

  res.end();
}


// Declare an http server
http.createServer(serverHandle).listen(8083)

// curl localhost:8080 or go to http://localhost:8080
*/