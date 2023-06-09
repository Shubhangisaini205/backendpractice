const express = require("express");
const { ProductModel } = require("../model/ProductModel");
const { AuthMidddleware } = require("../middlewares/AuthMiddleware");
const ProductRouter = express.Router();


ProductRouter.post("/add", async (req, res) => {
    try {
        const product = new ProductModel(req.body)
        await product.save();
        res.status(200).send({ "msg": "New Product Added Successfully" })

    } catch (error) {
        console.log(error);
        res.status(400).send({ "err": error.message })
    }
})

// to get all the data
ProductRouter.get("/all", async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).send(products)
    } catch (error) {
        console.log(error);
        res.status(400).send({ "err": error.message })
    }
})

// Data  of particular user

ProductRouter.get("/", async (req, res) => {
    const { title } = req.query;
    let query = {};
    if (title) {
        query.title = title
    }
    try {
        const products = await ProductModel.find({ $and: [{ authorId: req.body.authorId }, query] })
        res.status(200).send(products)
    } catch (error) {
        console.log(error);
        res.status(400).send({ "err": error.message })

    }
})

// Patch Particular product;

ProductRouter.patch("/update/:productId", async (req, res) => {
    const { productId } = req.params;
    const product = await ProductModel.findOne({ _id: productId });
    try {
        if (product.authorId == req.body.authorId) {
            await ProductModel.findByIdAndUpdate({_id:productId},req.body)
            res.status(200).send({msg:"Product has been updated"})
        } else {
            res.status(200).send({ msg: "You are not authorize to update this product" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Something went wrong" })
    }
})

// delete the particular product
ProductRouter.delete("/delete/:productId", async (req, res) => {
    const { productId } = req.params;
    const product = await ProductModel.findOne({ _id: productId });
    try {
        if (product.authorId == req.body.authorId) {
            await ProductModel.findByIdAndDelete({_id:productId},req.body)
            res.status(200).send({msg:"Product has been deleted"})
        } else {
            res.status(200).send({ msg: "You are not authorize to delete this product" })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "Something went wrong" })
    }
})


module.exports = { ProductRouter }