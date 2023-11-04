
const  mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
    _id: String,
    subjectName:String,
    subjectCode:String
},
{
    timestamps: {
        createdAt: "_created_at",
        updatedAt: "_updated_at"
    },
    versionKey: false
}
);

module.exports = mongoose.model("subject", subjectSchema,"subject");
