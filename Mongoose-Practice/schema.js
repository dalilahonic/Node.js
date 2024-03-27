import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: 'Dalila',

      // validate defines custom validation rules for the field. accepts object with 2 properties: validator, message.
      // validation runs only when you use create or save method
      validate: {
        //validator recives value of a filed and returns true if value is valid
        validator: (v) => v.length > 5,

        // funtion that returns custom error message if the validation fails
        message: (props) =>
          `Username must be longer than 5 characters`,
      },
    },
    email: {
      type: String,
      // required: true,
      lowercase: true,
      immutable: true, // the value of 'email' field cannot be changed
      minlength: 10, // minimum allowed length of a string
      maxlength: 100,
    },
    age: {
      type: Number,
      min: 12,
      max: 100,
    },
    private: Boolean,
    posts: [
      {
        //   _id: false,
        title: String,
        body: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    social: {
      following: Number,
      followers: Number,
    },
    reletedPerson: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Person',
      // referencing Person model
    },
    //   _id: false, // disable id
    //   _id: Number, // overwrite Mongoose's default id
  },
  {
    timestamps: true, // enable automatic timestamps, track when documents are created and updated
    strict: true, // enforce strict mode, Mongoose will throw an error if you try to save a document with properties that aren't defined in the schema
    collection: 'profiles', //  specify the name of the collection in the database, by default  Mongoose pluralizes the model name to determine the collection name
    minimize: false,

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

    query: {
      byUsername(username) {
        return this.where({ username });
      },
    },
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

// query helper functions

// userSchema.query.byUsername = function (username) {
//   return this.where({ username });
// };

export const UserProfile = mongoose.model(
  'userProfile',
  userSchema
);

//................................

const personSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    n: {
      type: String,
      alias: 'name',
    },
  },
  {
    // virtuals in Mongoose are additional properties that you can define on your schema, but they don't actually get stored in the MongoDB database
    virtuals: {
      getFullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(fullName) {
          this.firstName = fullName.split(' ')[0];
          this.lastName = fullName.split(' ')[1];
        },
      },
    },

    // options
    collection: 'people',
    // autoCreate: false,
    // caped: { size: 1024 }, // capped collection is a fixed sized collection that automaticlly overwrites the oldest documents when the collection reaches its maximum size. size specifies the maximum size of collection in bytes

    capped: { size: 1024, max: 1000 }, // collection can hold maximum of 1000 documents
    id: false,
    minimize: false, // Mongoose by default minimizes schemas by removing empty objects. this behaviour can be overriden by setting minimize to false

    strict: 'throw', // will cause error instead of dropping bad data
  }
);

// personSchema.virtual('getFullName').get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

// another way to set options
// schema.set(option, value);
// schema.set('bufferComands', false);

export const Person = mongoose.model(
  'Person',
  personSchema
);
