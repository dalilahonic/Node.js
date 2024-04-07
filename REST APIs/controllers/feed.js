exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: 'First Post',
        content: 'This is a first post',
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
    post: { id: new Date().toISOString(), title, content },
  });
};
