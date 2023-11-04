
const bcrypt = require('bcrypt');
const {  generateAccessToken, generateRefreshToken} = require('../middleware/verifyToken')
const {getFacultyDetails} = require('../models/Faculty')
const Sentry = require('@sentry/node');



const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({ message: 'email  or password is required', status: true })
        }
        const user = await getFacultyDetails(email)
        console.log("user",user);
        if(!user){
            return res.status(400).json({ status: false, message: 'Invalid user' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            const accessToken = await  generateAccessToken( user.role,user.name,user.email);
           const refreshToken =  await generateRefreshToken( user.role,user.name,user.email);
            delete user.password
            return res.status(200).json({ message: 'login successfull', status: true,  accessToken,refreshToken});
        } else {
            return res.status(400).send('Invalid email or password');
        }

    } catch (error) {
        Sentry.captureException(error);
        console.log(error)
        return res.status(500).json({ message: 'something went wrong', status: false, error: error.message });
    }
}

module.exports = {
    login
}