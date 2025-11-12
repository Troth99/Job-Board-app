import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
        type: String,
        required: [true, "Second name is required!"],
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
        required: [true, 'Phone number is required!'],
        trim: true,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, ['en-US', 'bg-BG']) || /^\+?[0-9\s\-()]{7,20}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    location: {
        type: String,
        required: [true, 'Location is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    avatar: {
        type: String,
        default: "",
    },
    createdAt: { type: Date, default: Date.now }
});

// has password before save

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(13);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})


// match passwords

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model('User', userSchema)


