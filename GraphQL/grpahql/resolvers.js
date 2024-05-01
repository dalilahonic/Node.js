const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// module.exports = {
//   hello() {
//     // return 'Hello World'
//     return {
//       text: 'Hello World',
//       views: 123,
//     };
//   },
// };

module.exports = {
  //   createUser(args, req) {
  createUser: async function ({ userInput }, req) {
    // const email = args.userInput.email;
    const email = userInput.email;

    const errors = [];

    if (!validator.isEmail(email)) {
      errors.push({ message: 'Email is invalid' });
    }

    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('User exists already');

      throw error;
    }
    const hashedPw = await bcrypt.hash(
      userInput.password,
      12
    );
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });

    const createdUser = await user.save();

    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },

  login: async function ({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.code = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(
      password,
      user.password
    );

    if (!isEqual) {
      const error = new Error('Password is incorrect. ');
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    return { token, userId: user._id.toString() };
  },
};
