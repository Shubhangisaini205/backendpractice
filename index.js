 const express = require("express")
 const cors = require("cors")
 const app = express();
 const {UserRouter} = require("./routes/UserRoutes");
const { connection } = require("./config/db");
const { ProductRouter } = require("./routes/ProductRoutes");
const { AuthMidddleware } = require("./middlewares/AuthMiddleware");
 app.use(express.json())
 app.use(cors())
 app.get("/",(req,res)=>{
    res.send("OK")
 })
 app.use("/user",UserRouter)
 app.use( AuthMidddleware)
 app.use("/product",ProductRouter)
 app.listen(8080, async()=>{
   try {
      await connection
      console.log("connected to db!!");

   } catch (error) {
      console.log(error)
   }
  console.log("server is running at port 8080")
 })