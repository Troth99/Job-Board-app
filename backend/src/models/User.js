import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from 'validator'


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: function() { return !this.googleId; },
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phoneNumber: {
        type: String,
        trim: true,
    },

    location: {
        type: String,
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password is required if googleId is not present
        },
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    googleId: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: "",
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire:{
        type:Date
    },

    savedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        },
    ]

});

// has password before save

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(13);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// match passwords

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)


