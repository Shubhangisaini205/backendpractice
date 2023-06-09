const Validator=(req,res,next)=>{
   const data = req.body
 if(!data.name||!data.email||!data.password||!data.age){
    res.status(400).send({"err":"Fill All the Details"})
 }else if(data.age<16 || data.age>60){
    res.status(400).send({"err":"Age must be in between 16 to 60"})
 }else{
    next();
 }
}

module.exports={
    Validator
}