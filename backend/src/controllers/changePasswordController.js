import User from "../models/User.js";


export const changePasswordController = async (req, res) => {
  try {
    const userId = req.user._id;
    let { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password are required." });
    }

   
    currentPassword = currentPassword.trim();
    newPassword = newPassword.trim();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

 
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password." });


    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};