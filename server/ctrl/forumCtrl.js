module.exports = {
  createPost: async (req, res) => {
    const db = req.app.get("db");
    const { title, content } = req.body;
    const { id } = req.session.user;
    const newPost = await db.create_post(title, content, id);
    res.status(200).send(newPost);
  },
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const posts = await db.get_posts();

    res.status(200).send(posts);
  },
  getPost: async (req, res) => {
    const db = req.app.get("db");
    const { postid } = req.params;
    const post = await db.get_post(postid);

    res.status(200).send(post);
  },
  editPost: async (req, res) => {
    const db = req.app.get("db");
    const { postid } = req.params;
    const { title, content } = req.body;
    const post = await db.edit_post(title, content, postid);
    res.status(200).send(post);
  },
  deletePost: async (req, res) => {
    const db = req.app.get("db");
    const { postid } = req.params;
    const deletePost = await db.delete_post(postid);

    if (deletePost) {
      res.sendStatus(200);
    }
  },
};
