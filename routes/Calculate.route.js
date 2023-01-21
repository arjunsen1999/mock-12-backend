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
    let totalMaturityValue = investmentAmount * (Math.pow((1 + (rate / 1)), (1 * totalNumberofYears)));
    let interest = totalMaturityValue - investmentAmount;
    res.send({investmentAmount, totalMaturityValue, interest})
   } catch (error) {
    res.status(400).send({msg : "Somthing Went Wrong", error})
   }
})


module.exports = {calculateRouter};