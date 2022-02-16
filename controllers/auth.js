const {sign} = require('jsonwebtoken')
const {createTransport} = require('nodemailer')
const sendgridMail = require('@sendgrid/mail')
const User = require('../models/user')

const {
    SENDGRID_API_KEY,
    JWT_ACCOUNT_ACTIVATION,
    JWT_EXPIRE_IN,
    EMAIL_FROM,
    CLIENT_URL,
    NODE_MAILER_EMAIL,
    NODE_MAILER_DISPLAY_NAME,
    NODE_MAILER_PASSWORD,
    NODE_MAILER_HOST,
    NODE_MAILER_PORT,
} = process.env

const transporter = createTransport({
    host: NODE_MAILER_HOST,
    port: NODE_MAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: NODE_MAILER_EMAIL, // generated ethereal user
        pass: NODE_MAILER_PASSWORD, // generated ethereal password
    },
})

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
        from: NODE_MAILER_EMAIL, //EMAIL_FROM,
        to: email,
        subject: `Activate your account`,
        html: `
            <h2>Please use the following link to activate your account</h2>
            <p>${CLIENT_URL}/auth/activate/${token}</p>
            <hr/>
            <p>This email may contain sensetive information</p>
        `,
    }

    transporter.sendMail(emailMessage, function (error, info) {
        if (error) {
            console.log(error)
            return res.json({message: err.message})
            // done(error)
        } else {
            console.log('Email sent: ' + info.response)
            return res.json({
                message: `Confirmation email has been sent to ${email}. Follow the instructions to activate your account`,
            })
            // done(null, info)
        }
    })

    // const mailOptions = {
    //     from: NODE_MAILER_EMAIL,
    //     to: to,
    //     subject: subject,
    //     html: body,
    //   }

    /*
    sendgridMail
        .send(emailMessage)
        .then(
            (sent) => {
                // console.log(sent)
                return res.json({
                    message: `Confirmation email has been sent to ${email}. Follow the instructions to activate your account`,
                })
            },
            (error) => {
                console.error(error)
                if (error.response) {
                    console.error(error.response.body)
                }
            },
        )
        .catch((err) => {
            // console.log(err)
            return res.json({message: err.message})
        })
        */
}
// .then((sent) => {
//     // console.log(sent)
//     return res.json({
//         message: `Confirmation email has been sent to ${email}. Follow the instructions to activate your account`,
//     })
// })
// .catch((err) => {
//     // console.log(err)
//     return res.json({message: err.message})
// })

//-----------------------------------

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
