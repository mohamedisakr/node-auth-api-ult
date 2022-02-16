const User = require('../models/user')

exports.signup = async (req, res) => {
    console.log(`req.body ${JSON.stringify(req.body)}`)
    const {name, email, password} = req.body
    const foundByEmail = await User.findOne({email}).exec()
    if (foundByEmail) {
        return res.status(400).json({message: 'EMail already exists'})
    }

    const userToAdd = new User({name, email, password}) //await User.create({name, email, password})
    userToAdd.save((err, success) => {
        if (err) {
            console.log(`signup errer: ${err}`)
            return res.status(400).json({message: 'Signup errer'})
        }

        return res.status(201).json({message: 'Signup success, please signin'})
    })
}
