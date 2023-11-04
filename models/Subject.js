const subjectModel = require('./subjectModel')
const uuid = require('uuid')

async function createSubject(subjectName) {
    try {
        const subjectCode = subjectName.slice(0, 2).toUpperCase();
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        const code = subjectCode + randomNumber;
        const data = {
            _id: uuid.v4().split('-')[0],
            subjectName: subjectName,
            subjectCode: code,
        };
        return new subjectModel(data).save()
    } catch (error) {
        throw error
    }
}

async function updateSubjectData(subjectCode,subjectName) {
    try {
    return await subjectModel.findOneAndUpdate({subjectCode},{subjectName})
    } catch (error) {
        throw error
    }
}

async function deleteSubjectDetails(subjectCode) {
    try {
        return await subjectModel.findOneAndDelete({subjectCode})
    } catch (error) {
        throw error
    }
}

async function findSubject(subjectName) {
    try {
        return subjectModel.findOne({subjectName}).lean()
    } catch (error) {
        throw error
    }
}

async function findSubjectByCode(subjectCode) {
    try {
        return subjectModel.findOne({subjectCode}).lean()
    } catch (error) {
        throw error
    }
}

async function getSubjectList(){
        try {
            return await subjectModel.find().lean()
        } catch (error) {
            throw error
        }
}

module.exports = {
    createSubject,
    findSubject,
    findSubjectByCode,
    deleteSubjectDetails,
    updateSubjectData,
    getSubjectList
}