var errorHandler ={
notFound:(req,res,next)=>{
    
    const err =new Error('Not Found');
    err.status= '404';
     next(err);
},
error: (err,req,res,next)=>{
    console.log(err)
    res.status(err.status|| 500).json({err:err.message|| "something went wrong"});
}
}

module.exports= errorHandler;