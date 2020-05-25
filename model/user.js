const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const user = {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true , unique:true },
    createAt: {type:String,default:Date.now},
    polls:[{type:mongoose.Schema.Types.ObjectId,ref:'Polls'}],
    otp: { type: String, expires: 120000, default:0 }
}

var userSchema = new mongoose.Schema(user);
userSchema.pre('save',async function(next){
    try {
        if(!this.isModified('password')){
            next();
        }
        const hashed =await bcrypt.hash(this.password,10);
       this.password=hashed;
       return next();
        
    } catch (error) {
      next(error)    
    }

})
userSchema.method("comparePassword", async function(pass,next){
      try { 
          const compare = await bcrypt.compare(pass,this.password);
          return compare;
      } catch (error) {
          next(error)
      }
}) 

module.exports= mongoose.model('User',userSchema);