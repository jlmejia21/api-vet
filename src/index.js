const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const cors = require('cors');
var employeesRouter = require('./routes/employees');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var ordersDetailRouter = require('./routes/orders_detail');
var appointmentsRouter = require('./routes/appointments');

// Settings
app.set('port', process.env.port || 3000);

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use('/', router);
app.use('/employees', employeesRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/orders_detail', ordersDetailRouter);
app.use('/appointments', appointmentsRouter);

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});