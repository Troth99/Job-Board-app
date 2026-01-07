import User from "../models/User.js";
import crypto from "crypto"
import sgMail from "@sendgrid/mail"
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const forgotPassword = async (req, res) => {

    const { email } = req.body;
  
    try {
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpire = Date.now() + 3600000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = resetTokenExpire;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const msg = {
            to: user.email,
            from: process.env.EMAIL_FROM,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset.</p><p>Click <a href='${resetUrl}'>here</a> to reset your password.</p>`,
        }
   
        await sgMail.send(msg)
     
        res.status(200).json({ message: "Reset email sent" });


    } catch (error) {
        res.status(500).json({ message: error.message });
  console.error("SendGrid error:", error.response?.body || error);


    }
}