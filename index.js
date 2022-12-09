import http from 'http'
import app from './app.js'

const server = http.createServer(app);

const { PORT } = process.env;
const port = PORT || 4002;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port http://192.168.1.78:${port}`);
});
