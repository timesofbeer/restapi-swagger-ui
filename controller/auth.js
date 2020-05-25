//const db = require('../model')
const db = require('../model');
const jwt =require('jsonwebtoken');
var otp = require('../helper/otp');
var sendMail = require('../helper/sendGrid')
var sMail= new sendMail();
var OTP = new otp()
 
auth = {
    register: async (req, res, next) => {
           
        try {
            const user = await db.user.create(req.body);
            const { id, username , email  } = user;
            res.status(201).json({message:"User regeistered successfully", id, username, email });

        } catch (error) {
              if(error.code==11000)
              error.message="Username is already taken";
              
            next(error)
        }

    },
    login: async (req, res, next) => {
        try {
            const user = await db.user.findOne({ username: req.body.username });

            if (!user) {
                res.json({ message: `User with ${req.body.username} Username Doesn't Exist` });
            } else {
                const {_id,username}=user
                valid = await user.comparePassword(req.body.password, next);
                 
                if (valid) {
                    const token=   jwt.sign({_id,username},"helloworld");
                    res.status(200).json({message:"Logged In successfully",...{_id, username ,token }});

                } else {
                    res.json({ message: `Invalid Username/Password` });
                }
            }

        } catch (error) {
            console.log(error)
            error.message="Invalid Username/Password"
            next(error)
        }
    },
    loginWithOtp: async (req, res, next) => {
        
        try {
            const user = await db.user.findOne({ username: req.body.username });

            if (!user) {
                res.json({ message: `User with ${req.body.username} Username Doesn't Exist` });
            } else {
               let _otp= OTP.generateOtp()
                result= await db.user.updateOne({username:req.body.username},{$set:{otp:_otp}})
                console.log(result)
                 await sMail.sendEmail(user.email,_otp)
                res.send({message:`OTP sent to ${user.email}`})
                
            }

        } catch (error) {
         //   console.log(error)
            error.message="Invalid username"
            next(error)
        }
    },
    verifyOtp: async (req, res, next) => {
        console.log(req.body)
        try {
            const user = await db.user.findOne({ username: req.body.username });

            if (!user) {
                res.json({ message: `User with ${req.body.username} Username Doesn't Exist` });
            } else {
               
               if(user.otp==req.body.otp){
                
                    await db.user.updateOne({username:req.body.username},{$set:{otp:''}})
                    const {_id,username}=user
                    const token=  jwt.sign({_id,username},"helloworld");
                    res.status(200).json({message:"Logged In successfully",...{_id, username ,token }});

                } else {
                    res.send({message: "Invalid OTP"})
                }
            }

        } catch (error) {
         //   console.log(error)
            error.message="Invalid OTP"
            next(error)
        }
    }
}

module.exports = auth;