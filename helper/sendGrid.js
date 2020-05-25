const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.sgkey);



class sendEmail{
    constructor(){
         this.sgMail=sgMail;
         
    }
    sendEmail(email,totp){
       return new Promise(async (resolve,reject)=>{
         try {
            const msg = {
                to: email,
                from: 'adityabaghel1228@gmail.com',
                subject: 'Your OTP From Test APPLication',
                text: 'EMAIL login',
                html: `Your OTP <strong>${totp}</strong>  : ${email}`,
              };
          response=  await this.sgMail.send(msg);
      
          resolve(response);
    
         } catch (error) {
         
            reject(error); 
         }

       })
    }
}
module.exports=sendEmail;