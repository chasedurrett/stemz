module.exports = {
  createSample: async (req, res) => {
    const db = req.app.get("db");
    const { name, key, type, genre, instrument, url, id } = req.body;
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
};
