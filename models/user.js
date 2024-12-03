const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    profileImage:{
        type:String,
        default: './public/default.png'
    },
    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER"
    }

},{timestamps: true})

// userSchema.pre('save', function(next){
//     const user = this

//     if(user.isModified('password')) return
// })

const User = mongoose.model('User', userSchema)

module.exports = User