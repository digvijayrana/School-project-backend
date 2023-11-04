const studentModel = require('./studentModel')
const uuid = require('uuid')

async function getStudentDetails(email) {
    try {
        return await studentModel.findOne({ $and: [{ email: email }, { status: true }] }).lean()
    } catch (error) {
        throw error
    }
}

async function getAllStudents() {
    try {
        return await studentModel.find().lean()
    } catch (error) {
        throw error
    }
}

async function getStudentCounts() {
    try {
        const result = await studentModel.aggregate([
            {
                $match: { role: 'student' }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            }
        ]);
        const totalCount = result.length > 0 ? result[0].total : 0;
        return totalCount;
    } catch (error) {
        throw error;
    }
}

async function createStudent(data) {
    try {
        const body = {
            _id: await uuid.v4().split('-')[0],
            status: true,
            ...data
        }
        return await new studentModel(body).save()
    } catch (error) {
        console.log("error", error);
        throw error
    }
}

async function findStudentById(id) {
    try {
        return await studentModel.findById({ _id: id }).lean()
    } catch (error) {
        console.log("error", error);
        throw error
    }
}

async function updateStudentData(id, data) {
    try {
        return await studentModel.findOneAndUpdate({ _id:id }, { $set: { ...data }})
    } catch (error) {
        throw error
    }
}

module.exports = {
    getStudentDetails,
    getStudentCounts,
    createStudent,
    findStudentById,
    getAllStudents,
    updateStudentData
}