const User = require('../models/user')

exports.findOneById = (req, res) => {
  const {id} = req.params
  User.findById(id)
    .select('-hashed_password -salt')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({message: 'User not found'})
      }
      res.status(200).json(user)
    })
}

exports.update = (req, res) => {
  //   console.log(`req.user ${JSON.stringify(req.user)}`)
  //   console.log(`req.body ${JSON.stringify(req.body)}`)
  const {_id} = req.user
  const {name, password} = req.body
  User.findById({_id}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({message: 'User not found'})
    }

    if (!name) {
      return res.status(400).json({message: 'Name is required'})
    } else {
      user.name = name
    }

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({message: 'Password must be at least 6 characters long'})
      } else {
        user.password = password
      }
    }

    user.save((err, updatedUser) => {
      if (err || !updatedUser) {
        return res.status(400).json({message: 'User update failed'})
      }

      updatedUser.hashed_password = undefined
      updatedUser.salt = undefined
      res.status(200).json(updatedUser)
    })
  })

  //   User.findById(id)
  //     .select('-hashed_password -salt')
  //     .exec((err, user) => {
  //       if (err || !user) {
  //         return res.status(400).json({message: 'User not found'})
  //       }
  //       res.status(200).json(user)
  //     })
}
