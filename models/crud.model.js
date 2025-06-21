const mongoose = require('mongoose')

const CrudSchema = new mongoose.Schema({
    name : {type : String,required : true},
    email : {type : String,required :  true},
    password : {type : String ,required : true},
    isDeleted : {type : Boolean,default : false}
},{
    versionKey : false,
    timestamps : true
})

const CrudModel = new mongoose.model("crudejs",CrudSchema)
module.exports = CrudModel