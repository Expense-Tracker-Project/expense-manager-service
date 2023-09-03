const mongoose = require("mongoose");
require("../db");

const newSchemaUser = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    expenses: {
        type: [{
            date: {
                type: String,
                required: true
            },
            reason: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }],
        default: []
    }
})

const UserModel = mongoose.model("Users", newSchemaUser);

module.exports = { UserModel };