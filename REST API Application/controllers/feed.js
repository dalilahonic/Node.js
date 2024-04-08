exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is a first post',
        imageUrl: 'images/code.jpg',
        creator: {
          name: 'Dalila',
        },
        date: new Date(),
      },
    ],
  });
};

exports.postPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // db
  res.status(201).json({
    message: 'Post created successfully',
    post: {
      id: new Date().toISOString(),
      title,
      content,
    },
  });
};
