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
