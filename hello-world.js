const http = require('node:http');
const connection = require('./database');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.end(JSON.stringify({ error: 'Database error' }));
      return;
    }

    res.end(JSON.stringify(results));
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
