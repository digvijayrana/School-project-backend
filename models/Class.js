const classModel= require('./classModel')
const uuid = require('uuid')


async function createClass(classNumber,section,subjectCodes,teachersCodes){
    try {
        const code = Math.floor(Math.random() * 900) + 100;
    const data = {
        _id: await uuid.v4().split('-')[0],
        classCode:code,
        classNumber,
        section,
        teachersCodes,
        subjectCodes
    }
    return new classModel(data).save()
    } catch (error) {
            throw error
    }
}


async function findClass(classNumber,section){
    try {
        return classModel.findOne({$and:[{classNumber:classNumber},{section:section}]}).lean()
    } catch (error) {
            throw error
    }
}

async function updateClassData(classCode, data) {
  try {
    let updateQuery = {};

    if (data.teachersCodes) {
      updateQuery.$set = updateQuery.$set || {};
      updateQuery.$set.teachersCodes = data.teachersCodes;
    }

    if (data.subjectCodes) {
      updateQuery.$set = updateQuery.$set || {};
      updateQuery.$set.subjectCodes = data.subjectCodes;
    }

    return await classModel.findOneAndUpdate(
      { classCode: classCode },
      updateQuery,
      {
        new: true,
        upsert: false,
      }
    );
  } catch (error) {
    throw error;
  }
}

  
  
 async function removeClassData(classCode, data) {
    try {
      let updateQuery = {};    
      if (data.teachersCodes) {
        updateQuery.$pull = updateQuery.$pull || {};
        updateQuery.$pull.teachersCodes = { $in: data.teachersCodes };
      }
      
      if (data.subjectCodes) {
        updateQuery.$pull = updateQuery.$pull || {};
        updateQuery.$pull.subjectCodes = { $in: data.subjectCodes };
      }
  
      return await classModel.findOneAndUpdate(
        { classCode: classCode },
        updateQuery,
        {
          new: true,
          upsert: false,
        }
      );
    } catch (error) {
      throw error;
    }
}
  

  async function findClassByCode(classCode) {
    try {
        return classModel.findOne({classCode}).lean()
    } catch (error) {
        throw error
    }
}

async function getClassList(){
        try {
            return await classModel.find().lean()
        } catch (error) {
            throw error
        }
}

async function getAllDetailsOfClass(classCode) {
  try {
    return await classModel.aggregate([
      {
        $match: {
          classCode: classCode // Replace with the desired classCode
        }
      },
      {
        $lookup: {
          from: "faculty", // Replace with the name of your teacher collection
          localField: "teachersCodes",
          foreignField: "teacherCode",
          as: "teachers"
        }
      },
      {
        $lookup: {
          from: "subject", // Replace with the name of your subject collection
          localField: "subjectCodes",
          foreignField: "subjectCode",
          as: "subjects"
        }
      },
      {
        $unwind: {
          path: "$teachers",
          preserveNullAndEmptyArrays: true // Include documents with no matching teachers
        }
      },
      {
        $unwind: {
          path: "$subjects",
          preserveNullAndEmptyArrays: true // Include documents with no matching subjects
        }
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            classCode: "$classCode",
            classNumber: "$classNumber",
            section: "$section",
            _created_at: "$_created_at",
            _updated_at: "$_updated_at"
          },
          teachers: {
            $addToSet: "$teachers.name" // Collect unique teacher names into an array
          },
          subjects: {
            $addToSet: "$subjects.subjectName" // Collect unique subject names into an array
          }
        }
      },
      {
        $project: {
          _id: "$_id._id",
          classCode: "$_id.classCode",
          classNumber: "$_id.classNumber",
          section: "$_id.section",
          teachers: 1,
          subjects: 1,
          _created_at: "$_id._created_at",
          _updated_at: "$_id._updated_at"
        }
      }
    ]);
  } catch (error) {
    throw error;
  }
}

async function deleteClassInformation(classCode) {
  try {
    return await classModel.deleteOne({ classCode: classCode });
  } catch (error) {
    throw error;
  }
}






module.exports = {
    createClass,
    findClass,
    updateClassData,
    removeClassData,
    findClassByCode,
    getClassList,
    getAllDetailsOfClass,
    deleteClassInformation
}