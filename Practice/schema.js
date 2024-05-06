import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'Untitled',
      trim: true,
      maxlength: 100,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    category: String,
  },
  {
    methods: {
      countWords() {
        const wordCount = this.body
          ? this.body.split(/\s+/).length
          : 0;
        return wordCount;
      },
    },
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
