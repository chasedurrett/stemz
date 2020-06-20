
module.exports = {
    createSample: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        const {name, key, type, genre, instrument, url} = req.body
        const newSample = await db.create_sample(name, key, type, genre, instrument, url, id)
        if(newSample[0]){
            res.status(200)
        }
    }
}