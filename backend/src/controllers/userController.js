import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import  { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, location, password, avatar } = req.body;

  try {
 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      location,
      password,
      avatar
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
    });

    res.status(201).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location,
        avatar: user.avatar
      },
      accessToken,
      refreshToken
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

  try {
    const user = await User.findOne({ email });
    console.log(user)
 
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }


    const passwordMatches = await user.matchPassword(password);
    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

  
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);


    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        location: user.location,
        avatar: user.avatar
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
   
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Unauthorized" });
    }

 
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User was not found" });
    }

 
    // await Post.deleteMany({ userId: req.user._id });
    // await Comment.deleteMany({ userId: req.user._id });

 
    await User.findByIdAndDelete(req.user._id);

    
    res.status(200).json({ message: "Profile was deleted." });
  } catch (error) {
    console.error("An error occured while deleting the profile:", error);
    res.status(500).json({ message: error.message });
  }
};

export const logOutUser = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Missing refresh token" });
  }

  try {
    await RefreshToken.deleteOne({ token: refreshToken });

    res.json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserProfileImage = async (req, res) => {
  try {
   
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

 
    if (user.avatar) {
      
      const imgbbApiKey = '844b750f8696c887633d12684dff203e';
      
    
      const imageId = user.avatar.split('/').pop().split('.')[0]; 

   
      const response = await fetch(`https://api.imgbb.com/1/delete?key=${imgbbApiKey}&image=${imageId}`, {
        method: 'DELETE'
      });

    
      const data = await response.json();
      
      if (data.success) {
        console.log('Image deleted from ImgBB');
      } else {
        console.log('Failed to delete image from ImgBB');
      }

     
      user.avatar = null;
      await user.save(); 
    }

    
    res.status(200).json({ message: "Profile image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the profile image" });
  }
};


export const refreshAccessToken = async (req, res) => {
  const {refreshToken} = req.body;

  if(!refreshToken){
    return res.status(401).json({ message: "Refresh token required" });
  };

  try {
  
    const storedToken = await RefreshToken.findOne({token: refreshToken});
    if(!storedToken){
      return res.status(403).json({message: 'Invalid refresh token.'})
    }


    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);


    const newAccessToken = generateAccessToken(decoded.id);


  
    res.json({
      accessToken: newAccessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
 
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
}