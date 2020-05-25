const otplib=require('otplib');
const totp=otplib.totp;
      totp.options =  {digits:6,step: 120}
class otp {
  constructor(){
    this.totp=otplib.totp;
    this.secret=process.env.OTPSECRET;
  }
  generateOtp(){
   return this.totp.generate(this.secret)
  }
  verifyOtp(otp){
    console.log(token)
  return this.totp.verify({ otp, secret });
  }
}

module.exports=otp;