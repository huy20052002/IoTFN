const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.get('/getAllActions', actionController.getAllActions);
router.get('/searchActions', actionController.searchActions);
router.get('/searchActionByDate', actionController.searchActionByDate);
router.post('/insertAction', actionController.insertAction);
router.post('/toggleDevice', actionController.toggleDevice);
router.get('/handleSortingAsc', actionController.handleSortingAsc);
router.get('/handleSortingChosenOne', actionController.handleSortingChosenOne);
module.exports = router;
