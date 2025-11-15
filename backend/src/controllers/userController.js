import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, location, password, avatar } = req.body;


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ firstName, lastName, email, phoneNumber, location, password, avatar });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      location: user.location,
      avatar: user.avatar,
      token: generateToken(user._id)
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const fieldErrors = {};
      for (const key in error.errors) {
        fieldErrors[key] = error.errors[key].message;
      }
      return res.status(400).json({ fieldErrors });
    }
    res.status(500).json({ message: error.message });
  }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "User does not exist." });
        }

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select('-password');

           if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUserProfile = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const logOutUser = async( req, res) => {
    try {
        res.status(200).json({message: 'Logged out'})
    } catch (error) {
            res.status(500).json({ message: error.message });

    }
}