const express = require('express');
const authRouter = express.Router();
const { AuthModel } = require('../models/Auth.model');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 6;
const secretKey = process.env.secretKey;
const {VerifyToken} = require('../Middleware/VerifyToken')

// User Signup
authRouter.post("/register", [
    body('name', "Enter a Name").not().isEmpty(),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a Valid Password").not().isEmpty(),
], async (req, res) =>{
    try {
        // If Any Error Exists throw Error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg : errors.errors[0].msg });
        }

        let {name, email, password} = req.body;
        
        let isAuth = await AuthModel.findOne({email});
        if(isAuth){
            res.status(400).send({ msg : "This Email Already Exists Please Login" });
        }
        let hashPassword = await bcrypt.hash(password, saltRounds);
        let createUser = await AuthModel.create({name, email, password : hashPassword});
        if(createUser){
            res.send({msg : "Register Successfully!"});
        }
    } catch (error) {
        res.status(400).send({msg : "Somthing Went Wrong", error})
    }
});

// User Login
authRouter.post("/login", [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a Valid Password").not().isEmpty(),
], async (req, res) =>{
    try {
        // If Any Error Exists throw Error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg : errors.errors[0].msg });
        }
        let {email, password} = req.body;

        let isAuth = await AuthModel.findOne({email});
        if(!isAuth){
            res.status(400).send({ msg : "Invalid Credentials" });
        }
        
        let isPasswordMatch = await bcrypt.compare(password, isAuth.password);
        if(isPasswordMatch){
            let token = jwt.sign({ _id : isAuth._id }, secretKey);
             res.send({msg : "Login Successfully", token });
        }else{
            res.status(400).send({ msg : "Invalid Credentials" });
         }
    } catch (error) {
        res.send({msg : "Somthing Went Wrong", error})
    }
});

authRouter.get("/getProfile", VerifyToken, async (req, res) =>{
  try {
    let _id = req.authId;
    let user = await AuthModel.findOne({_id});
    res.send(user);
  } catch (error) {
    res.send({msg : "Somthing Went Wrong", error})
  }
})

module.exports = {authRouter};