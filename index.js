/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//middlewares
//**middlwares are aplicable for each request except you specified a route for them
//** middlware stack bt2ol en lw 7tet el middleware b3d el route msh htshtghl */
// console.log(process.env.NODE_ENV);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`)); // /public now is the route for each static file
/* middlewares for routing  */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// start server
module.exports = app;
const x = 12;
