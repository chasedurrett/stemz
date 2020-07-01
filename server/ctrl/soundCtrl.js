module.exports = {
  createSample: async (req, res) => {
    const db = req.app.get("db");
    const { name, key, type, genre, instrument, url } = req.body;
    const { id } = req.session.user;
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
    const db = req.app.get("db");
    const { id } = req.session.user;
    const userSamples = await db.get_user_samples(id);

    res.status(200).send(userSamples);
  },
  deleteUserSample: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const data = await db.delete_user_sample(id);
    if (!data) {
      return res.status(505).send(`Couldn't delete item, we're fixing that!`);
    }
    res.sendStatus(200);
  },
  createSamplePack: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { name, img } = req.body;
    const samplePack = await db.create_sample_pack(name, img, id);

    if (!samplePack) {
      return res
        .status(505)
        .send(`Couldn't create sample-pack, we're fixing that!`);
    }
    res.status(200).send(samplePack);
  },
  getUserSamplePacks: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const userSamplePacks = await db.get_user_sample_packs(id);

    if (!userSamplePacks) {
      return res
        .status(505)
        .send(`Couldn't get sample-packs, we're fixing that!`);
    }

    res.status(200).send(userSamplePacks);
  },
  getSamplePacks: async (req, res) => {
    const db = req.app.get("db");
    const samplePacks = await db.get_sample_packs();

    res.status(200).send(samplePacks);
  },
  getIndividualSamplePack: async (req, res) => {
    const db = req.app.get("db");
    const { samplepackid } = req.params;
    const samplePack = await db.get_individual_sample_pack(samplepackid);

    res.status(200).send(samplePack);
  },
  getSamplePackDetails: async (req, res) => {
    const db = req.app.get("db");
    const { samplepackid } = req.params;
    const samplePackDetails = await db.get_sample_pack_details(samplepackid);

    const data = samplePackDetails[0];

    res.status(200).send(data);
  },
  addToSamplePack: async (req, res) => {
    const db = req.app.get("db");
    const { samplePackId, sampleId } = req.body;

    const updatedSamplePack = await db.add_to_sample_pack(
      samplePackId,
      sampleId
    );

    res.status(200).send(updatedSamplePack);
  },
};
