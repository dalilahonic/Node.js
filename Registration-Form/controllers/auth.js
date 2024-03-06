import User from '../models/User.js';

export const postSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      res.json({
        error: 'User with this email already exists',
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

    const newUser = new User({ username, email, password });

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
    const user = await User.findOne({ email, password });

    if (!user) {
      res.json({ error: `Wrong email or password` });
    }
    res.json({ email, password });
  } catch (err) {
    console.log(err);
  }
};
