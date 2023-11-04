const router = require('express').Router()

const {register,getAllDetails,getCounts,addClass,
    updateClass,removeClassDetails,addSubject,getAllClass,getAllSubject,updateSubject, 
    deleteSubject,facultyList,getAllClassDetails,deleteClass,
    updateFaculity,addStudent,getStudentDetailsById,getStudentList, updateStudent, facultyDetailsByEmail} = require('../controllers/admin')


router.post('/register',register)
router.get('/get-details',getAllDetails)
router.get('/get-counts',getCounts)
router.post('/add-class',addClass)
router.patch('/update-class',updateClass)
router.post('/delete-class',deleteClass)
router.post('/remove-class-data',removeClassDetails)
router.post('/add-subject',addSubject)
router.get('/class-list',getAllClass)
router.get('/subject-list',getAllSubject)
router.patch('/update-subject',updateSubject)
router.post('/delete-subject',deleteSubject)
router.get('/faculty-list',facultyList)
router.get('/get-All-class-details',getAllClassDetails)
router.patch('/update-user',updateFaculity)
router.post('/add-student',addStudent)
router.get('/student-details',getStudentDetailsById)
router.get('/students-list',getStudentList)
router.patch('/update-student',updateStudent)
router.get('/user-details',facultyDetailsByEmail)

module.exports = router