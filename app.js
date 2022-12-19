import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors";
dotenv.config()
import db_connect from './config/database.js'
import auth from './middleware/auth.js'
import handleError from './middleware/errorHandler.js';
db_connect()
// Import Routes
import { default as userRoutes } from './routes/users.js';
import { default as userTasksRoutes } from './routes/user-task.js';



const app = express();

// Cors Whitelist
const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://192.168.1.78:4001',
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


// User Routes
app.use('/api/user', cors(corsOptions), userRoutes);
// Task Routes
app.use('/api/user-task', [auth, cors(corsOptions)], userTasksRoutes);


// Catch-ALL Error Middleware
app.use(handleError);




export default app