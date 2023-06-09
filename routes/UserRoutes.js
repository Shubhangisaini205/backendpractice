const express = require("express")
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");
const { Validator } = require("../middlewares/Vaildator");


//REGISTER the user
UserRouter.post("/register",Validator,async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash })
            await user.save();
            res.status(200).send({ "msg": "Account Created" })
        });

    } catch (error) {
        console.log(err);
        res.status(400).send({ "err": error.message })
    }

})

// Get all the users
UserRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users)

    } catch (error) {
        console.log(error);
        res.status(400).send({ "msg": error.message })
    }
})

// Login the user
UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, username: user.name }, 'practice');
                    res.status(200).send({ "msg": "Login Successfull!", "token": token })
                } else {
                    console.log("error")
                    res.status(400).send({ "msg": "Email and Password mismatch" })
                }
            })
        } else {

            res.status(400).send({ "msg": "Email and Password mismatch" })
        }
    } catch (error) {

        console.log(error);
        res.status(400).send({ "err": error.message })
    }
})


module.exports = {
    UserRouter
}