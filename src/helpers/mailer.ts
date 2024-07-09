import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId}:any) =>{
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, {$set:
          {verifyToken: hashedToken, 
            verifyTokenExpiry: (Date.now() + 3600000)
          }
        });
            
    } else if (emailType === "RESET"){
        await User.findByIdAndUpdate(userId, {$set:
            {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}})
    }

        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "7e8c309ff0c150", // ❌ put it in environment variable
            pass: "f625e1afff5b33" // ❌ put it in environment variable
          }
        })

        const mailOptions = {
          from: 'ajlal00786@gmail.com', // sender address
          to: email, // list of receivers
          subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        

          const mailResponse =  await transport.sendMail(mailOptions);
          return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}