import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
import './app/connection.js'

// Import Routes
import userRoutes from './app/routes/user.js';
import sectionRoutes from './app/routes/sections.js';
import tasksRoutes from './app/routes/tasks.js';




const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 3002;
const jsonParser = bodyParser.json()



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    console.clear()
    console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::')
    // console.log('REQUEST::', req)
    next();
});


// Tasks Routes
app.use('/api/user', userRoutes);
app.use('/api/section', jsonParser, sectionRoutes);
app.use('/api/tasks', jsonParser, tasksRoutes);


app.listen(PORT, () => {
    console.log('Server is running....', PORT)
})