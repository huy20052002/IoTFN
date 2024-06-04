
const pool = require('../db');


const getAllSensors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const totalRecords = await getTotalRecords();

    const totalPages = Math.ceil(totalRecords / limit);

    const sql = "SELECT * FROM sensor ORDER BY datetime DESC LIMIT ?, ?";
    const [result] = await pool.query(sql, [offset, parseInt(limit)]);

    res.status(200).json({ totalPages, sensorData: result });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getTotalRecords = async () => {
  const [result] = await pool.query("SELECT COUNT(*) as totalRecords FROM sensor");
  return result[0].totalRecords;
};

const getTotalSearchRecords = async (type, keyword) => {
  try {
    let sql = '';
    let params = [];

    switch (type) {
      case 'temperature':
        sql = 'SELECT COUNT(*) AS totalSearchRecords FROM sensor WHERE temperature = ?';
        break;
      case 'humidity':
        sql = 'SELECT COUNT(*) AS totalSearchRecords FROM sensor WHERE humidity = ?';
        break;
      case 'brightness':
        sql = 'SELECT COUNT(*) AS totalSearchRecords FROM sensor WHERE brightness = ?';
        break;
      default:
        throw new Error('Invalid type. Valid types are temperature, humidity, brightness');
    }

    const [result] = await pool.query(sql, [keyword]);

    return result[0].totalSearchRecords;
  } catch (error) {
    throw new Error('Error executing MySQL query in getTotalSearchRecords:', error);
  }
};

const searchSensors = async (req, res) => {
  try {
    const { type, keyword } = req.query;
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    if (!type || !keyword) {
      return res.status(400).json({ message: 'Missing required parameters.' });
    }

    let sql = "";
    let params = [keyword];

    const totalSearchRecords = await getTotalSearchRecords(type, keyword);

    if (totalSearchRecords === 0) {
      return res.status(404).json({ message: 'No sensors found.' });
    }

    const totalSearchPages = Math.ceil(totalSearchRecords / limit);

    switch (type) {
      case 'temperature':
        sql = 'SELECT * FROM sensor WHERE temperature = ? LIMIT ?, ?';
        break;
      case 'humidity':
        sql = 'SELECT * FROM sensor WHERE humidity = ? LIMIT ?, ?';
        break;
      case 'brightness':
        sql = 'SELECT * FROM sensor WHERE brightness = ? LIMIT ?, ?';
        break;
      default:
        return res.status(400).json({ message: 'Invalid type. Valid types are temperature, humidity, brightness' });
    }

    const [results] = await pool.query(sql, [...params, offset, limit]);

    res.status(200).json({ totalSearchPages, currentPage: page, sensorData: results });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const sortSensors = async (req, res) => {
  try {
    const { page = 1, limit = 10, field, order } = req.query;
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM sensor ORDER BY ${field} ${order} LIMIT ?, ?`;
    const [result] = await pool.query(sql, [offset, parseInt(limit)]);

    const [count] = await pool.query("SELECT COUNT(*) AS totalRecords FROM sensor");
    const totalRecords = count[0].totalRecords;

    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({ totalPages, sensorData: result });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

// const sortSensors = async (req, res) => {
//   try {
//     let { field, order,  page = 1, limit = 10 } = req.query;
//     page = parseInt(page);
//     limit = parseInt(limit);
//     const offset = (page - 1) * limit;

//     // Validate the field parameter
//     const validFields = ['id', 'temperature', 'humidity', 'brightness', 'datetime'];
//     if (!validFields.includes(field)) {
//       return res.status(400).json({ message: 'Invalid field parameter.' });
//     }

//     // Validate the order parameter
//     if (order !== 'asc' && order !== 'desc') {
//       return res.status(400).json({ message: 'Invalid order parameter. Use "asc" or "desc".' });
//     }

//     // Construct the SQL query
//     const sql = `SELECT * FROM sensor ORDER BY ${field} ${order} LIMIT ?, ?`;
//     const params = [offset, limit];

//     // Execute the query
//     const [result] = await pool.query(sql, params);

//     // Calculate total records
//     const [count] = await pool.query('SELECT COUNT(*) AS totalRecords FROM sensor');
//     const totalRecords = count[0].totalRecords;

//     // Calculate total pages
//     const totalPages = Math.ceil(totalRecords / limit);

//     // Return the sorted sensor data and pagination info
//     res.status(200).json({ totalPages, currentPage: page, sensorData: result });
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };


const insertSensor = async (req, res) => {
  try {
    const { temperature, humidity, brightness, datetime } = req.body;
    const query = 'INSERT INTO sensor (temperature, humidity, brightness, datetime) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [temperature, humidity, brightness, datetime]);
    res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllSensors,
  insertSensor,
  searchSensors,
  sortSensors,
};
