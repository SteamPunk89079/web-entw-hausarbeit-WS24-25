
import express from 'express';

const app = express();

// CMD line parsing
const args = process.argv.slice(2);
const port = parseInt(args[0], 10) || 8080;

// Validate port nr
if (isNaN(port) || port <= 0 || port > 65535) {
  console.error('Please provide a valid port number between 1 and 65535.');
  process.exit(1);
}

app.get('/', (request, resolve) => {
  resolve.send('Hello');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use.`);
  } else {
    console.error('Failed to start the server:', err);
  }
  process.exit(1);
});
