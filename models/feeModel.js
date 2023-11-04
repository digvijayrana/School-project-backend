const  mongoose = require("mongoose");

const feeSchema = mongoose.Schema({
    _id:string,
    student_roll_no:String
},
{
    timestamps: {
        createdAt: "_created_at",
        updatedAt: "_updated_at"
    },
    versionKey: false
}
);

module.exports = mongoose.model("fee", feeSchema,"fee");