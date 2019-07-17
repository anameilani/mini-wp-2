const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId}= require('mongodb')

let articleSchema= new Schema({
    title:{
        type: String,
        required: [true, 'Title required']
    },
    content: {
        type:String,
        required: [true, 'Content required']
    },
    thumbnail: String,
    author: {
        type: ObjectId,
        ref: 'User'
    },
    tags:{
        type: Array
    },
    status: String
},{timestamps: true})

let Article= mongoose.model('article', articleSchema)

module.exports= Article