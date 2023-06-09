const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        authorId: { type: String, required: true },
    }, {
    versionKey: false
}
)

const ProductModel = mongoose.model("product", ProductSchema)

module.exports = {
    ProductModel
}