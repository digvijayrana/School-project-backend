const facultyModel = require('./facultyModel')
const uuid = require('uuid')

async function getFacultyDetails(email) {
    try {
        return await facultyModel.findOne({ $and: [{ email: email }, { status: true }] }).lean()
    } catch (error) {
        throw error
    }
}

async function getFacultyList() {
    try {
        return await facultyModel.find({ role: 'teacher' }).lean()
    } catch (error) {
        throw error
    }
}

async function updateFaculityData(teacherCode, data) {
    try {
        return await facultyModel.findOneAndUpdate({ teacherCode }, { $set: { ...data }})
    } catch (error) {
        throw error
    }
}

async function createFaculty(data) {
    try {
        const body = {
            _id: await uuid.v4().split('-')[0],
            status:true,
            ...data
        }
        return await new facultyModel(body).save()
    } catch (error) {
        console.log("error", error);
        throw error
    }
}

async function getDetailsByName(name, skip = 0, limit = 10) {
    try {
        const result = await facultyModel.aggregate([
            {
                $match: {
                    name: { $regex: name, $options: 'i' },
                },
            },
            {
                $facet: {
                    data: [
                        {
                            $skip: skip, // Specify the number of documents to skip (0 to start from the beginning)
                        },
                        {
                            $limit: limit, // Specify the number of documents to return (adjust as needed)
                        },
                    ],
                    total: [
                        {
                            $count: 'count',
                        },
                    ],
                },
            },
        ]);

        const data = result[0] && result[0].data ? result[0].data : null;
        const totalCount = result[0] && result[0].total[0] && result[0].total[0].count ? result[0].total[0].count : 0;

        return { data, totalCount };
    } catch (error) {
        throw error
    }
}

async function getFacultyCount() {
    try {
        const result = await facultyModel.aggregate([
            {
                $match: { role: 'teacher' }
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

async function getAdminCounts() {
    try {
        const result = await facultyModel.aggregate([
            {
                $match: { role: 'admin' }
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

async function deleteClassByCode(classCode) {
    try {
        return await facultyModel.deleteMany({ classCode: classCode })
    } catch (error) {
        throw error
    }
}

module.exports = {
    getFacultyDetails,
    updateFaculityData,
    createFaculty,
    getDetailsByName,
    getFacultyCount,
    getAdminCounts,
    getFacultyList,
    deleteClassByCode
}