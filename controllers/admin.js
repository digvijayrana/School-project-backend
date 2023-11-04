const {createFaculty,getDetailsByName,getFacultyCount, getAdminCounts,getFacultyList,getFacultyDetails,updateFaculityData} = require('../models/Faculty')
const {getStudentCounts, createStudent,getStudentDetails,findStudentById,getAllStudents,updateStudentData} = require('../models/Student')
const {findClass,createClass,updateClassData,removeClassData,getClassList,getAllDetailsOfClass,deleteClassInformation}= require('../models/Class')
const {createSubject,findSubject,getSubjectList,updateSubjectData,deleteSubjectDetails,}= require('../models/Subject')
const bcrypt = require('bcrypt')
const {validateUser} = require('../models/facultyValidator')
const {formatDateToCustomFormat} = require('../helper/dateFormate')
const {generateUniqueCode} = require('../helper/   generateUniqueCode')
const moment = require('moment')


const register = async (req, res) => {
    try {
        const body = req.body
        const validationErrors = validateUser(body);
        if (validationErrors.length > 0) {
            console.error('Validation errors:', validationErrors);
            return res.status(500).json({message:validationErrors})
        }
        const user  = await getFacultyDetails(body.email)
        if(user){
            return res.status(400).json({status:false,message:'Faculty  details already Exists'})
        }
        if (body && body.dob) {
            const password = await formatDateToCustomFormat(body.dob)
            body.password = await bcrypt.hash(password, 10)
        }
        const teacherCode =  generateUniqueCode()
        if(teacherCode){
            body.teacherCode=teacherCode
        }
        await createFaculty(body)
        return res.status(201).json({ status: true, message: 'Added Faculty Successfull' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', status: false, error: error.message });
    }
}

const getAllDetails = async(req,res)=>{
    try {
        const {name} = req.query
        if(!name){
            return res.status(400).json({message:'Name field is Null'})
        }
        const {data, totalCount} =  await getDetailsByName(name)
        return res.status(201).json({ message: " successfull",data,totalCount });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', status: false, error: error.message });
    }
}

const getCounts =async(req,res)=>{
    try {
        const facultyCounts = await getFacultyCount()
        const adminCounts = await getAdminCounts()
        const studentCounts = await getStudentCounts()
        return res.status(200).json({ message: " successfull" ,facultyCounts, adminCounts, studentCounts});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', status: false, error: error.message });
    }

}

const addClass = async (req, res) => {
    try {
        const { section, classNumber,teachersCodes,subjectCodes } = req.body;
        if (!classNumber || !section || !teachersCodes  || !subjectCodes) {
            return res.status(400).json({ status: false, message: 'Class Name  or  Class Section or Teacher Name or Subject  are required.' });
        }
        const  number = parseInt(classNumber)
        if(number>12){
            return res.status(404).json({message:'Invalid class number'})
        }
        const classData = await findClass(classNumber, section);
        if (classData) {
            return res.status(400).json({ status: false, message: 'Class Already Exists.' });
        }
        await createClass(classNumber, section,subjectCodes,teachersCodes);
        return res.status(201).json({ status: true, message: 'Class created successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}


const updateClass = async(req,res)=>{
    try {
        const {classCode}=req.query
        const {teachersCodes,subjectCodes}= req.body
        if(!teachersCodes && !subjectCodes){
            return res.status(400).json({message:'No data present for update'})
        }
        
        await updateClassData(classCode,{teachersCodes,subjectCodes})
        return res.status(200).json({status:true,message:'Class Information update successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const removeClassDetails= async(req,res)=>{
    try {
        const {classCode}=req.query
        const {teachersCodes,subjectCodes}= req.body
        if(!teachersCodes && !subjectCodes){
            return res.status(400).json({message:'No data present for update'})
        }
        await removeClassData(classCode,{teachersCodes,subjectCodes})
        return res.status(200).json({status:true,message:'Class Information remove successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const addSubject = async(req,res)=>{
    try {
        const {subjectName} = req.body
        if(!subjectName){
            return res.status(400).json({message:'Subject name is required'})
        }
        const subjectDetails = await findSubject(subjectName)
        if(subjectDetails){
            return res.status(400).json({message:'Subject Name is already exists'})
        }
        await createSubject(subjectName)
        return res.status(201).json({status:true,message:'Subject added successfully'})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const getAllSubject = async(req,res)=>{
    try {
        const result = await getSubjectList()
        return res.status(200).json({status:true,message:'Successfull',data:result})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const getAllClass = async(req,res)=>{
    try {
        const result = await getClassList()
        return res.status(200).json({status:true,message:'Successfull',data:result})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const updateSubject= async(req,res)=>{
    try {
        const {subjectName,subjectCode}= req.body
        if(!subjectCode || !subjectName){
            return res.status(400).json({message:'No data present for update'})
        }
        await updateSubjectData(subjectCode,subjectName)
        return res.status(200).json({status:true,message:'Subject Information update successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const deleteSubject = async(req,res)=>{
    try {
        const {subjectCode} = req.body
        if(!subjectCode){
            return res.status(400).json({message:'Subject code is required'})
        }
        await deleteSubjectDetails(subjectCode)
        return res.status(200).json({status:true,message:'Subject Information delete successfully'})
    } catch (error) {
         console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const facultyList = async(req,res)=>{
    try {
    const result = await getFacultyList()
    return res.status(200).json({status:true,message:' successfull',data:result})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const getAllClassDetails = async (req, res) => {
    try {
        const { classCode } = req.query
        const result = await getAllDetailsOfClass(classCode)
        if(result && result[0] && result[0].teachers){
            let teachersName= result[0].teachers.flat(1)
           delete result[0].teachers
           result[0]['teachersName']= teachersName
        }
        if(result && result[0] && result[0].subjects){
            let subjectsName= result[0].subjects.flat(1)
           delete result[0].subjects
           result[0]['subjectsName']= subjectsName
        }
        return res.status(200).json({ status: true, message: ' successfull', data: result })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const deleteClass =  async(req,res)=>{
    try {
        const {classCode} = req.body
        if(!classCode){
            return res.status(400).json({message:'Class code is required'})
        }
        await deleteClassInformation(classCode)
        return res.status(200).json({ status: true, message: ' class Delete successfull' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const updateFaculity = async(req,res)=>{
    try {
        const {teacherCode} = req.query  
        const body = req.body  
        console.log('teacherCode',teacherCode);
        if(!teacherCode){
            return res.status(400).json({message:'Teacher code is required'})
        } 
   
        if(body && body.code){
            delete body.code
        }
        await updateFaculityData(teacherCode,body)
        return res.status(200).json({status:true,message:'Faculty Information update successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const addStudent = async (req, res) => {
    try {
        const body = req.body
        const user = await getStudentDetails(body.email)
        if (user) {
            return res.status(400).json({ status: false, message: 'Student  details already Exists' })
        }
        await createStudent(body)
        return res.status(201).json({ status: true, message: 'Added student Successfull' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', status: false, error: error.message });
    }
}

const getStudentDetailsById = async(req,res)=>{
    try {
        const {id} =  req.query
        if(!id){
            return res.status(400).json({message:'Please provide the student id'})
        }
        const result  = await findStudentById(id)
        return res.status(201).json({ status: true, message: ' Successfull',data:result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', status: false, error: error.message });
    }
}

const getStudentList =async(req,res)=>{
    try {
        const result = await getAllStudents()
        return res.status(201).json({ status: true, message: ' Successfull',data:result })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', status: false, error: error.message });
    }
}

const updateStudent = async(req,res)=>{
    try {
        const {id} = req.query  
        const body = req.body  
        if(!id){
            return res.status(400).json({message:'Student Id is required'})
        } 
        await updateStudentData(id,body)
        return res.status(200).json({status:true,message:'Student Information update successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

const facultyDetailsByEmail = async(req,res)=>{
    try {
        const {email}= req.query
        if(!email){
            return res.status(400).json({message:'email id is required'})
        }
        const result = await getFacultyDetails(email)
        return res.status(200).json({status:true,message:' successfull',data:result})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Something went wrong.', error: error.message });
    }
}

module.exports = {
    register,
    getAllDetails,
    getCounts,
    addClass,
    updateClass,
    removeClassData,
    removeClassDetails,
    addSubject,
    getAllSubject,
    getAllClass,
    updateSubject,
    deleteSubject,
    facultyList,
    getAllClassDetails,
    deleteClass,
    updateFaculity,
    addStudent,
    getStudentDetailsById,
    getStudentList,
    updateStudent,
    facultyDetailsByEmail
}