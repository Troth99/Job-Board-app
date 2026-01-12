import User from "../models/User.js";
import bcrypt from "bcrypt"



export const resetPasswordController = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" })
        }

        user.password = await bcrypt.hash(newPassword, 13);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}