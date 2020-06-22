module.exports = {
  createSample: async (req, res) => {
    const db = req.app.get("db");
    const { name, key, type, genre, instrument, url} = req.body;
    const {id} = req.session.user
    const newSample = await db.create_sample(
      name,
      key,
      type,
      genre,
      instrument,
      url,
      id
    );
    if (newSample[0]) {
      res.status(200);
    }
  },
  getSamples: async (req, res) => {
    const db = req.app.get("db");
    const samples = await db.get_samples();

    if (!samples) {
      return res
        .status(505)
        .send(`Couldn't get samples, we're working on that!`);
    }

    res.status(200).send(samples);
  },
  getUserSamples: async (req, res) => {
      const db = req.app.get('db')
      const {id} = req.session.user
      const userSamples = await db.get_user_samples(id)

      res.status(200).send(userSamples)
  },
  deleteUserSample: async (req, res) => {
      const db = req.app.get('db')
      const {id} = req.params
      const data = await db.delete_user_sample(id)
      if(!data){
          return res.status(505).send(`Couldn't delete item, we're fixing that!`)
      }
      res.sendStatus(200)
  }
};
