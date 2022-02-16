const {Schema, model} = require('mongoose')
const {createHmac} = require('crypto')

// user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: 'subscriber',
    },
    resetPasswordLink: {
      data: String,
      default: '',
    },
  },
  {timestamps: true},
)

// virtual
userSchema
  .virtual('password')
  .set(function (password) {
    // create a temporarity variable called _password
    this._password = password
    // generate salt
    this.salt = this.makeSalt()
    // encryptPassword
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

// methods
userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
      return ''
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + ''
  },
}

const User = model('User', userSchema)
module.exports = User
