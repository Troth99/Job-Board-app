import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true],
    },
    email: {
        type: String,
        required: [true],
        unique: true,
    },
    password: {
        type: String,
        required: [true],
    },
    role: {
        type: String,
        enum: ['candidate', 'employer', 'recruiter', 'moderator', 'admin'], default: 'candidate'
    },
      avatar: {
    type: String, 
    default: "",  
  },
    createdAt: {type: Date, default: Date.now}
});

// has password before save

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
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


