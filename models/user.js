import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  firstName: { type: String, unique: false, maxlength: 50, required: true },
  lastName: { type: String, unique: false, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, maxlength: 50, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  // ADD A FAVOURITES ARRAY TO THE USER SCHEMA - type array, unique false, required true
  favourites: { type: Array, unique: false, required: true },
})

userSchema.set('toJSON', {
  transform(_doc, json) {
    delete json.password
    return json
  },
})

userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('User', userSchema)

export default User