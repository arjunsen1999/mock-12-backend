const express = require('express');
const calculateRouter = express.Router();
const { CalculateModel } = require('../models/Calculate.model');
const { body, validationResult } = require('express-validator');
const {VerifyToken} = require('../Middleware/VerifyToken')

calculateRouter.post("/calculate", VerifyToken, async (req, res) =>{
   try {
    let _id = req.authId;
    let {annualInstalmentAmount, annualInterestRate, totalNumberofYears} = req.body
    let investmentAmount = annualInstalmentAmount * totalNumberofYears;
    let rate = annualInterestRate / 100;
    // let totalMaturityValue = annualInstalmentAmount * [({(1+ rate) ** totalNumberofYears} -1) / rate];
    // res.send({investmentAmount})
   } catch (error) {
    res.status(400).send({msg : "Somthing Went Wrong", error})
   }
})


module.exports = {calculateRouter};