const  mongoose = require("mongoose");

const facultySchema = mongoose.Schema(
    {
    _id: String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: [
 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address' ],
        unique: true,
        required: [true, 'Please provide a email address'],
    },
    avatar: {
        type: String,
    },
    resetToken: String,
    resetTokenExpires: Date,
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Please add a password which has at least 6 characters'],
    },
    username: {
        type: String,
        unique:true,
        required: [true, 'Username is required'],
    },
    gender: {
        type: String,
        enum:['Male','Female','Others'],
        default:'Male'
    },
    department: {
        type: String
    },
    contactNumber: {
        type: String,
        unique: true,
        required: [true, 'Please provide a Contact Number'],
    },
    dob: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: String,
        required: [true,"Please provide a Date of Joining "],

    },
    endDate: {
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ['Teacher', 'Admin'],
        default:'Teacher'
    },
    teacherCode:String,
    classIncharge:String, // store class section code 
    passwordUpdated: {
        type: Boolean,
        default: false,
    },
    specialty:String,
    address: Object,
    status: Boolean,
    subjects :Array,
    qualification :{
        type:String
    },
    previousSchoolDetails:Object
},
{
    timestamps: {
        createdAt: "_created_at",
        updatedAt: "_updated_at"
    },
    versionKey: false
}
);


module.exports = mongoose.model( "faculty", facultySchema,"faculty");

