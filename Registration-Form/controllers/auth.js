import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const postSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const doesEmailExist = await User.findOne({
      email: email,
    });
    const doesUsernameExist = await User.findOne({
      username: username,
    });

    if (doesEmailExist) {
      res.json({
        error: 'User with this email already exists',
      });
    } else if (doesUsernameExist) {
      res.json({
        error: 'User with this username already exists',
      });
    } else if (username.length < 5) {
      res.json({
        error: 'Username must be longer than 5 characters',
      });
    } else if (
      !email.includes('@') ||
      !email.includes('.') ||
      email.length < 6 ||
      email.split('@')[1].length < 3
    ) {
      res.json({
        error: 'Please enter a valid email!',
      });
    } else if (password.length < 7) {
      res.json({
        error: 'Password must be longer than 7 characters',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    newUser
      .save()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));

    res.json({ username, email, password });
  } catch (err) {
    console.log(err);
  }
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const paswordMatch = await bcrypt.compare(
        password,
        user.password
      );

      const username = user.username;

      paswordMatch
        ? res.json({ username, email })
        : res.json({ error: 'Wrong email or password' });
    } else {
      res.json({ error: `Wrong email or password` });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUserInformation = async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json({
      username: user.username,
      email: user.email,
    });
  }
};

export const postEditUser = async (req, res) => {
  const {
    username: newUsername,
    email,
    oldUsername,
  } = req.body;

  const user = await User.findOne({
    username: oldUsername,
  });

  if (!user) {
    return res.json({ error: 'User not found' });
  }

  user.username = newUsername;
  user.email = email;
  await user.save();

  res.json({ username: user.username, email: user.email });
};
