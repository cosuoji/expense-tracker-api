import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String, 
        required: true,
    }, 
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const User = mongoose.model("user", userSchema)
export default User