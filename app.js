const http = require('http');
const redis = require('redis');

const client = redis.createClient({ url: 'redis://redis:6379' });
client.connect();

const server = http.createServer(async (req, res) => {
  await client.incr('visits');
  const visits = await client.get('visits');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`This page has been visited ${visits} times\n`);
});
server.listen(3000, () => console.log('App running on port 3000'));
