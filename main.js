const express = require('express')
const app = express() 
var productRoutes = require('./api/routes/product')
var orderRoutes = require('./api/routes/order')
var userRoutes = require('./api/routes/user')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');
const checkAuth = require('./api/middleware/check-auth')

//db connection
mongoose.connect(
  'mongodb+srv://node-rest-shop:1234@node-rest-shop.457bo.mongodb.net/node-rest-shop?retryWrites=true&w=majority',
  {
   useNewUrlParser: true,
   useUnifiedTopology: true
  });

  mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header('Acceess-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Header', 
//     'Origin, X-Requested-with, Content-Type, Accept, Authorization'
//     )
//     if(req.method === 'OPTIONS'){
//       res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT')
//       return res.status(200).json({})
//     }

// })

// Handling incoming request
app.use('/products', productRoutes)
app.use('/orders', checkAuth, orderRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status(404);
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})
app.listen(port = 8000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})