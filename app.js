import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
import db_connect from './config/database.js'
import auth from './middleware/auth.js'
db_connect()




// Import Routes
import { default as UserRoutes } from './routes/users.js';
import { default as UserTasksRoutes } from './routes/user-tasks.js';

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    next();
});

// User Routes
app.use('/api/user', UserRoutes);
// Task Routes
app.use('/api/user-task', auth, UserTasksRoutes);

export default app