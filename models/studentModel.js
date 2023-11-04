/*eslint-env es6*/
const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
    },
    roll_no: {
        type: String,
        required:  [true, "Please provide an roll no"],
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/,
            "Please provide a valid email address",
        ],
        unique: true,
        required: [true, "Please provide an email address"],
    },
    // Add similar validation for other fields ...
    contactNumber: {
        type: Number,
        validate: {
            validator: function (value) {
                return /^[0-9]{10}$/.test(value);
            },
            message: "Contact number should be a 10-digit number.",
        },
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    dob: {
        type: String,
        required: [true, 'Please provide a Date Of Birth '],

    },

    admissionYear: {
        type: Number
    },
    admissionDate: {
        type: String,
        required: [true, 'Please provide a admission date '],

    },
    father_name: {
        type: String
    },
    mother_name: {
        type: String
    },
    class:String,
    section: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['student'],
        default: "student"
    },
    passwordUpdated: {
        type: Boolean,
        default: false,
    },
    address: Object,
    resetToken: String,
    username:String,
    resetTokenExpires: Date,
    sessions: {
        type: Object,
    
    },
    status: Boolean,
    subjects: Array,
    father_contect: String,
    blood_group: String,
    previousSchoolDetails: Object,
    monthly_fees: String,
},

    {
        timestamps: {
            createdAt: "_created_at",
            updatedAt: "_updated_at"
        },
        versionKey: false
    }
);

module.exports = mongoose.model("students", studentSchema, "students");

