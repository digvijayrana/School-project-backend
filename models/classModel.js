const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
    _id: String,
    classCode: String,
    classNumber: {
        type: String,
        validate: [
            {
                validator: function (value) {
                    return value.length === 2;
                },
                message: 'Class name must be exactly 2 characters long.'
            }
        ],
        required: true
    },
    section: String,
    teachersCodes: Array,
    subjectCodes: Array
}, {
    timestamps: {
        createdAt: "_created_at",
        updatedAt: "_updated_at"
    },
    versionKey: false
});

module.exports = mongoose.model("class", classSchema, "class");
