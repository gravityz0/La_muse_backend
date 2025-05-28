const express = require('express')
const transporter = require('./transporter')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors(
    {
    origin: 'https://la-muse.onrender.com'
}
))
app.use(bodyParser.json())


app.post('/send',async(req,res)=>{
    const {fullName, email, phoneNumber, emailSubject,message} = req.body;
    try {
        await transporter.sendMail({
            from: email,
            to: process.env.USER_ACCOUNT,
            subject: emailSubject,
            html: `
            <h2>Received message from La muse</h2>
            <p><strong>Names</strong>: ${fullName}</p>
            <p><strong>Phone Number</strong>: ${phoneNumber}</p>
            <p><strong>Message</strong>: ${message}</p>
            `
        })
        res.status(200).json({message: "Message sent!"})
    } catch (error) {
        console.log(`User: ${process.env.USER_ACCOUNT}`)
        console.log(`Password: ${process.env.APP_PASSWORD}`)
        console.log(error)
        res.status(500).json({message: "An error occured sending message"})
    }
})

const port = process.env.PORT || 4530

app.listen(port,()=>{
    console.log("Server listening");
})

module.exports = app