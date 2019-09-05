const express = require('express');
const server = express();

const postRouter = require('./posts/postRouter.js'); 
const userRouter = require('./users/userRouter.js'); 

server.use(express.json());

server.use(logger)

server.use('/posts', postRouter);
server.use('/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
}); 



//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} from ${req.url}`
  ); 

  next(); 
};



module.exports = server;
