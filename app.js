import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import db_connect from './config/database.js'
db_connect()
import bodyParser from 'body-parser'
import auth from './middleware/auth.js'



// Import Routes
// import userRoutes from './routes/user.js';
import SectionRoutes from './routes/sections.js';
import TasksRoutes from './routes/tasks.js';

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    next();
});


// app.use('/api/')
// app.use('/api/user', userRoutes);
app.use('/api/section', SectionRoutes);
app.use('/api/tasks', TasksRoutes);

export default app