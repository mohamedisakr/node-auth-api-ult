const User = require('../models/user')
const {sign} = require('jsonwebtoken')
const sendgridMail = require('@sendgrid/mail')

const {
    SENDGRID_API_KEY,
    JWT_ACCOUNT_ACTIVATION,
    JWT_EXPIRE_IN,
    EMAIL_FROM,
    CLIENT_URL,
} = process.env

sendgridMail.setApiKey(SENDGRID_API_KEY)

exports.signup = async (req, res) => {
    const {name, email, password} = req.body
    const foundByEmail = await User.findOne({email}).exec()

    if (foundByEmail) {
        return res.status(400).json({message: 'EMail already exists'})
    }

    const token = sign({name, email, password}, JWT_ACCOUNT_ACTIVATION, {
        expiresIn: JWT_EXPIRE_IN,
    })

    const emailMessage = {
        from: EMAIL_FROM,
        to: email,
        subject: `Activate your account`,
        html: `
            <h2>Please use the following link to activate your account</h2>
            <p>${CLIENT_URL}/auth/activate/${token}</p>
            <hr/>
            <p>This email may contain sensetive information</p>
        `,
    }

    sendgridMail
        .send(emailMessage)
        .then((sent) => {
            // console.log(sent)
            return res.json({
                message: `Confirmation email has been sent to ${email}. Follow the instructions to activate your account`,
            }).cat
        })
        .catch((err) => {
            // console.log(err)
            return res.json({message: err.message})
        })
}

// exports.signup = async (req, res) => {
//     console.log(`req.body ${JSON.stringify(req.body)}`)
//     const {name, email, password} = req.body
//     const foundByEmail = await User.findOne({email}).exec()
//     if (foundByEmail) {
//         return res.status(400).json({message: 'EMail already exists'})
//     }

//     const userToAdd = new User({name, email, password}) //await User.create({name, email, password})
//     userToAdd.save((err, success) => {
//         if (err) {
//             console.log(`signup errer: ${err}`)
//             return res.status(400).json({message: 'Signup errer'})
//         }

//         return res.status(201).json({message: 'Signup success, please signin'})
//     })
// }
