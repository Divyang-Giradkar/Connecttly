const express = require('express');
const router = express.Router();
const { logCommunication, getCommunicationsByCompany, getOverdueCommunications,getAllCommunications } = require('../Controller/commuctionController');

router.post('/communication', logCommunication);
router.get('/communications', getAllCommunications);
router.get('/communications/company/:companyId', getCommunicationsByCompany);
router.get('/communications/overdue', getOverdueCommunications);

module.exports = router;
