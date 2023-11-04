const {getUserByEmailId,updateUserByEmailId,findUserByDetails} = require('../models/User')
const randomstring = require('randomstring');
const {sendMailer} = require('../helper/mailService')
const bcrypt = require('bcrypt')


const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body; 
        if (!email) {
            return res.status(400).json({ message: 'Please enter your registered email' });
        }
        const user = await getUserByEmailId( email );
       
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }      
        const data = {
        resetToken :randomstring.generate(10),
        resetTokenExpires: Date.now()
        }
        console.log("data",data)
     
        await updateUserByEmailId(email,data)
        await sendMailer(data.resetToken, email);

        return res.status(200).json({ message: 'Reset token sent successfully' });
    } catch (error) {
        console.error('Error sending email: ', error);
        return res.status(500).json({ message: 'Failed to send reset token' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        if (!email || !token || !newPassword) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const currentTime = new Date();
        const currentTimeMinusOneHour = new Date(currentTime - 3600000); // One hour ago
        const query = {
            email,
            resetToken: token,
            resetTokenExpires: { $gt: currentTimeMinusOneHour, $lt: currentTime }
        }
        const user = await findUserByDetails(query)
        if (!user) {
            return res.status(400).json({ error: 'Invalid token or token expired' });
        }

        // Update the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUserByEmailId(email,{ password: hashedPassword, passwordUpdated: true })
        return res.json({ status: true, message: 'Password updated successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred' });
    }
}


module.exports = {
    forgotPassword,
    resetPassword
}