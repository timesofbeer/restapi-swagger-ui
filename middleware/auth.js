const jwt =require('jsonwebtoken');
auth = async (req,res,next)=>{
   try { 
    if(req.headers.authorization){ 
        const token =req.headers.authorization.split(' ')[1];
        const decoded =await jwt.verify(token,"helloworld");
              console.log(decoded)
              req.decode= decoded;
              next();
       }else{
           throw new Error("No token Provided");
       }
       
   } catch (error) {
      
       error.message="Failed to authenticate Token";
       next(error)
   }
}

module.exports=auth;