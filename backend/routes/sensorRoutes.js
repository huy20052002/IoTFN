const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/getAllSensors', sensorController.getAllSensors);
router.post('/insertSensor', sensorController.insertSensor);
router.get('/searchSensors', sensorController.searchSensors);
router.get('/sortSensors', sensorController.sortSensors)
module.exports = router;
