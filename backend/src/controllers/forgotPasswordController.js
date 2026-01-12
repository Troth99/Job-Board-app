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
            html: `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 30px;">
      <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 30px;">
        <h2 style="color: #2d7ff9;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You requested a password reset for your Job Board account.</p>
        <p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background: #2d7ff9; color: #fff; border-radius: 4px; text-decoration: none; font-weight: bold;">
            Reset Password
          </a>
        </p>
        <p>If you did not request this, you can ignore this email.</p>
        <p style="color: #888; font-size: 12px;">This link will expire in 1 hour.</p>
      </div>
    </div>
  `,
        }

        await sgMail.send(msg)

        res.status(200).json({ message: "Reset email sent" });


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error("SendGrid error:", error.response?.body || error);


    }
}