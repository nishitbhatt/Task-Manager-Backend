import express from 'express'
import connection from '../connection.js';
const sectionRoutes = express.Router()

sectionRoutes.get('/all', (req, res) => {
    let status, message, data;
    connection.query('SELECT * FROM task', function (error, results, fields) {
        if (error) throw error;
        if (results) {
            status = 200;
            message = "Recored Found!";
            data = results
            return res.status(status).json({ status, message, data });
        }
    });

})

sectionRoutes.get('/test', (req, res) => {
    return res.json({ key: "USER Test API" })
})

sectionRoutes.post('/authenticate', (req, res) => {

    const { username, password } = req.body
    let status = 404

    if (username === 'nishit@gmail.com' && password === '123') {
        status = 200
    }

    return res.json({ status })
})


export default sectionRoutes