const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'text/html');

  res.write('<html> <body>');

  if (url === '/') {
    res.write('<h1> Hello world! </h1>');
    res.write(
      "<form method='POST' action='/create-user'> <label> username </label> <input type='text' name='username'> <button type='submit'>Submit</button> </form>"
    );
  }

  if (url === '/users') {
    res.write('<ul> <li> Dummy User </li> </ul>');
  }

  if (url === '/create-user' && method === 'POST') {
    res.write('<h1> Welcome! </h1>');
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log('Username: ' + username);
      res.statusCode = 302;
    });
  }

  res.write('<body> <html>');
  res.end();
});

server.listen(3000);
