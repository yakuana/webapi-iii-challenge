// code away!

require('dotenv').config()

// import server from './api/server';
const server = require('./server.js');

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`\n** API on port ${port} **\n`));
