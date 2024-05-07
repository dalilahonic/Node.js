import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: mongoose.Schema.Types.Mixed,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
