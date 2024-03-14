import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    minlength: 7,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  verificationToken: mongoose.Schema.Types.Mixed,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
