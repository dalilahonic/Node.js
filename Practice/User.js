import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
