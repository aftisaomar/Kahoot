const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Creating a mongoDB Schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Your password can't contain 'password' !")
            }
        }
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

//Hash plain text password
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

// Loign users
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user;

}

// Generate jwt token
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    // Generate jwt token with a payload and a secret key
    const token = jwt.sign({
        _id: user._id.toString(),
        email: user.email,
        is_admin: user.is_admin
    }, 'SomeSecret')

    //user.tokens = user.tokens.push(token);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// Set a "OneToMany" kind of relationship between the user and it's tasks
/*userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})*/

userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;

    return userObj;
}

const User = mongoose.model('User', userSchema);

module.exports = User;