const http = require('http');

const routes = require('./routes');

// const server = http.createServer(routes);
const server = http.createServer(routes.handler);

server.listen(3002);

//.....................................

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((request, response) => {
//   //   console.log(request);
//   //   console.log(request.url, request.method, request.headers);

//   const url = request.url;
//   const method = request.method;

//   if (url === '/') {
//     response.write(
//       '<head><title> Enter Message </title> <head>'
//     );
//     response.write(
//       '<body> <form action="/message" method="POST"> <input type="text" name="message"> <button type="submit"> Send </button> </form> </body>'
//     );
//     response.write('</html>');
//     return response.end();
//   }

//   if (url === '/message' && method === 'POST') {
//     const body = [];
//     request.on('data', (chunk) => {
//       console.log(chunk);
//       body.push(chunk);
//     });
//     return request.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString();
//       // console.log(parsedBody);
//       const message = parsedBody.split('=')[1];
//       fs.writeFile('message.txt', message, (err) => {
//         response.statusCode = 302;
//         response.setHeader('Location', '/');
//         return response.end();
//       });
//     });
//   }

//   response.setHeader('Content-Type', 'text/html');
//   // second argument is value for this header key
//   // this will attach a header to our response where we pass some meta information saying that the type of the content which will also be part of the response is html

//   response.write('<html>');
//   response.write(
//     '<head><title> My first page </title> <head>'
//   );
//   response.write('<body> <h1>Hello world!</h1></body>');
//   response.write('</html>');
//   response.end();
// }
// );
// // takes in a request listener as an argument which is simply a funtion that will executre for every upcoming request

// server.listen(3002);
// // arguments: port on which you want to listen, hostname
