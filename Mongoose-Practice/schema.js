import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, default: 'Dalila' },
    email: String,
    private: Boolean,
    posts: [
      {
        //   _id: false,
        title: String,
        body: String,
        date: { type: Date, default: Date.now },
      },
    ],
    social: {
      following: Number,
      followers: Number,
    },
    //   _id: false, // disable id
    //   _id: Number, // overwrite Mongoose's default id
  },
  {
    timestamps: true, // enable automatic timestamps, track when documents are created and updated
    strict: true, // enforce strict mode, Mongoose will throw an error if you try to save a document with properties that aren't defined in the schema
    collection: 'profiles', //  specify the name of the collection in the database, by default  Mongoose pluralizes the model name to determine the collection name

    // instance methods
    methods: {
      findByUsername() {
        return mongoose
          .model('userProfile')
          .find({ username: this.username })
          .exec();
      },
    },

    statics: {
      findByUsername(username) {
        return this.findOne({ username }); // this refers to the userProfile model
      },
    },
    // static methods are the ones that are attached to the model itself (ex. userProfile). instance methods are functions that are attached to the individual document instances
  }
);

// another two ways to define instance methods

// #1
// userSchema.methods.findByUsername = function () {
//   return mongoose
//     .model('userProfile')
//     .find({ username: this.username })
//     .exec();
// };

// #2

// userSchema.method('findByUsername', function () {
//   return mongoose
//     .model('userProfile')
//     .find({ username: this.username })
//     .exec();
// });

userSchema.method('hello', function () {
  console.log('hello world!');
});


// another two ways to define static methods

// #1

// userSchema.statics.findByUsername = function (usernme) {
//   return this.findOne({ username }); // this refers to the userProfile model
// };

// #2

// userProfile.static('findByUsername', function (username) {
//   return this.findOne({ username });
// });

// do not use arrow function bacause arrow functions prevent binding this

const userProfile = mongoose.model(
  'userProfile',
  userSchema
);

export default userProfile;
