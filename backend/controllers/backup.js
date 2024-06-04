const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const port = 3001;

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
})

// app.get('/', (re, res) =>{
//     return res.json("from backend");
// });


app.get('/sensorData', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const sql = `SELECT * FROM sensor LIMIT ?, ?`;
    const values = [offset, pageSize];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json(result);
    });


});

app.get('/clickData', (re, res) => {
    const page = parseInt(re.query.page) || 1;
    const pageSize = parseInt(re.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const sql = "SELECT * FROM clickdata LIMIT ?, ?";
    const values = [offset, pageSize];
    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json(result);
    });
});


app.get('/searchSensor', (req, res) => {
    const { selectedValue, value, page, pageSize } = req.query;

    if (!selectedValue || !value) {
        return res.status(400).json({ Message: 'Type and value are required in query parameters' });
    }

    const parsedPage = parseInt(page) || 1;
    const parsedPageSize = parseInt(pageSize) || 10;
    const offset = (parsedPage - 1) * parsedPageSize;

    let sql = '';
    let errorMessage = '';
    let values = [];
    switch (selectedValue) {
        case 'all':
            sql = 'SELECT * FROM sensor WHERE temperature = ? OR moisture = ? OR light = ? LIMIT ?, ?'
            errorMessage = 'All data';
            values = [value, value, value, offset, parsedPageSize];
            break;
        case 'temperature':
            sql = 'SELECT * FROM sensor WHERE temperature = ? LIMIT ?, ?';
            errorMessage = 'Temperature is required in query parameters';
            values = [value, offset, parsedPageSize];
            break;
        case 'moisture':
            sql = 'SELECT * FROM sensor WHERE moisture = ? LIMIT ?, ?';
            errorMessage = 'Moisture is required in query parameters';
            values = [value, offset, parsedPageSize];
            break;
        case 'light':
            sql = 'SELECT * FROM sensor WHERE light = ? LIMIT ?, ?';
            errorMessage = 'Light is required in query parameters';
            values = [value, offset, parsedPageSize];
            break;
        default:
            return res.status(400).json({ Message: 'Invalid type specified' });
    }

    // const values = [value, offset, parsedPageSize];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(`Error while searching ${selectedValue}:`, err);return res.status(500).json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
})

app.get('/sortSensor', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const sortOption = req.query.sortOption === 'asc' ? 'asc' : 'desc';
    const sortBy = req.query.sortBy;

    let sql = '';
    let values = [];

    switch (sortBy) {
        case 'temperature':
        case 'moisture':
        case 'light':
            sql = `SELECT * FROM sensor ORDER BY ${sortBy} ${sortOption} LIMIT ?, ?`;
            values = [offset, pageSize];
            break;
        default:
            return res.json({ Message: 'Invalid sort field' });
    }

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Message: 'error' });
        return res.json(result);
    });
});


app.listen(port, () => {
    console.log("listening " + port);
});