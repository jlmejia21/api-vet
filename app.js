require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

const usersRouter = require('./routes/users.route');
const productsRouter = require('./routes/products.route');
const ordersRouter = require('./routes/orders.route');
const awsRouter = require('./routes/aws');

const employeesRouter = require('./routes/employees');
const ordersDetailRouter = require('./routes/orders_detail');
const appointmentsRouter = require('./routes/appointments');


process.title = 'apiVet';

// Middlewares
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//Routes
app.use(express.static('public'))
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/aws', awsRouter);

app.use('/employees', employeesRouter);
app.use('/orders_detail', ordersDetailRouter);
app.use('/appointments', appointmentsRouter);
app.get('*', (req, res) => {
    res.send('404|Page not found')
})
// Starting the server
app.listen(process.env.PORT, () => {
    console.log('Server on port', process.env.PORT);
});