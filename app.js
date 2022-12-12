import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors";

dotenv.config()
import db_connect from './config/database.js'
import auth from './middleware/auth.js'
db_connect()




// Import Routes
import { default as UserRoutes } from './routes/users.js';
import { default as UserTasksRoutes } from './routes/user-tasks.js';

const app = express();

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:8100',
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
    credentials: true
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//     res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     console.log('HEREEEE')
//     next();
// });

// User Routes
app.use('/api/user', cors(corsOptions), UserRoutes);
// Task Routes
app.use('/api/user-task', auth, UserTasksRoutes);

export default app