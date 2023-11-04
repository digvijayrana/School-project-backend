const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const templatePath = path.join(__dirname, '..', 'views', 'forgot-password.html');
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');





const sendMailer=  async(token,email)=>{
    try {
        const dynamicData = {
            token: token,
            email:email
          };
          console.log(dynamicData)
     const renderedTemplate = ejs.render(htmlTemplate, dynamicData);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL_ID,
              pass: process.env.MAIL_PASSWORD
            }
          });

          const mailOptions = {
            to: email,
            subject: 'Reset Your Password',
            text: `Click on the following link to reset your password:`,
            html: renderedTemplate
          };
        
        return await transporter.sendMail(mailOptions)     
    } catch (error) {
        console.error(`Error sending reset password email to ${email}:`, error);
        throw error
    }
}


module.exports = { sendMailer }