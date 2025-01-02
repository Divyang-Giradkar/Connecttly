const express = require('express');
const router = express.Router();
const { createCompany, getCompanies, updateCompany, deleteCompany ,getCompanyById} = require('../Controller/companyController');

router.post('/company', createCompany);
router.get('/companies', getCompanies);
router.get('/company/:id', getCompanyById);
router.put('/company/:id', updateCompany);
router.delete('/company/:id', deleteCompany);

module.exports = router;
