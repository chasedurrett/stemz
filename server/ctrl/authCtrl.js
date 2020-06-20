const bc = require("bcryptjs");

module.exports = {
  registerUser: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, email } = req.body;
    const existingUser = await db.get_user(username);
    if (existingUser[0]) {
      return res.status(409).send(`Username already exists!`);
    }
    const salt = bc.genSaltSync(10);
    const hash = bc.hashSync(password, salt);
    const newUser = db.create_user(username, hash, email);
    req.session.user = newUser[0];
    res.status(200).send(req.session.user);
  },
  loginUser: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const existingUser = await db.get_user(username);
    if (!existingUser[0]) {
      return res.status(404).send(`User doesn't exist`);
    }
    const auth = bc.compareSync(password, existingUser[0].password);
    if (!auth) {
      return res.status(403).send(alert(`Username or password incorrect`));
    }
    req.session.user = existingUser[0];
    res.status(200).send(req.session.user);
  },
  logoutUser: async (req, res) => {
    const db = req.app.get("db");
    req
  },
};
