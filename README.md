# Stemz

### Stemz is a web application that offers musicians and music producers a place to share their samples in a clear and free format. This site is intended for users who would like to share and download samples, but don't want to deal with a monthly subscription. Users can create a profile, upload individual sounds, download samples created by other users, and organize their favorite sounds across the site into sample-packs.

## MVP

- A user can create a profile, log in, and log out. The user profile will display all of the samples that user has uploaded.
- A user can upload individual samples and specify the genre, instrument, bpm, and type (loop or one-shot).
- A user can create a sample-pack (akin to a playlist) with their favorite samples from across the site. These can be their samples or samples uploaded by other users.
- A user can view a single sample-pack and see it's contents.
- A user can search through all the samples on the site and filter by genre, type, instrument, and bpm.
- A user can download sounds.

## Extra features

- A beat sequencer created with the Web Audio API and Tone.js that gives users a place to be creative and sketch ideas.
- Sorting sample-packs on the home page by genre.

## Technologies

- react.js, axios.js, express.js, sass, express-fileupload, nodeMailer.js, bcrypt.js, amazon s3, dotenv, massive, tone.js, web audio API. 

## Wireframe/Views

- Auth.js

![picture](/wireframe/Auth.png)

- SamplePackDashboard.js

![picture](/wireframe/samplePackDashboard.png)

- SamplesDashboard.js

![picture](/wireframe/SamplesDashboard.png)

- Profile.js

![picture](/wireframe/Profile.png)

- SamplePack.js

![picture](/wireframe/SamplePack.png)

- UploadSampleForm.js

![picture](/wireframe/uploadSampleForm.png)

- SamplePackFrom.js

![picture](/wireframe/samplePackForm.png)

- Component tree

![picture](/wireframe/ComponentTree.png)

- Detailed Component Tree

![picture](/wireframe/DetailedComponentTree.png)

## Components

- Auth.js: Stateful (username: '', password: ''). Will hold post requests for registering and logging in users. If a user clicks register it will render another input for them to input their email.
- App.js: Functional. Holds routes, Header.js, and Nav.js.
- Header.js: Stateful (dropdownSelected: false). Holds logo and the dropdown menu for the link to the user profile page.
- Nav.js: Functional. Holds links to samplePackForm.js and uploadSampleForm.js, also links to other views (browse sample-packs & browse samples)
- samplePackForm.js: Stateful (sample-pack name and img, samples: [], selectedSamples: []). Holds post request and inputs to create a new sample pack, as well as a handleInput() function to update state. Also holds a get request inside of a componentDidMount to get all of the available samples to choose from, then maps over an array of samples including a button to push that sample to the selectedSample array on state.
- uploadSampleForm.js: Stateful (name: '', bpm: '', genre: '', instrument: '', type: '', sampleUrl: ''). Hold post request to create a new sample and send it to the DB. Holds inputs and a respective handleInput() function. The rest of the inputs--bpm, instrument, and type--will be selected from dropdown menus.
- SamplesDashboard.js: Stateful (samples: []). Will hold a get request in a componentDidMount to get all of the samples to display and map over the array, returning Sample.js for each iteration. Will pass down info to Sample.js as props and a download function through props.
- Sample.js: Functional. Will display the sample name, instrument, type, genre, and bpm, and a download button.
- SamplePackDashboard.js: Stateful (samplePacks: []). Will hold a get request in a componentDidMount to grab all of the samplePacks to display on the front page.
- SamplePack.js: Functional. will display the sample-pack name and its contents.
- Profile.js: Functional. Profile page will display username and the list of samples that user has uploaded.

## Endpoints

### Auth

```javascript
app.post('/auth/register')

    receives: req.body {
        username: '',
        password: '',
        email: ''
    }
    sends: {
        username: '',
        password: '',
        email: ''
    }

app.post('/auth/login')

    receives: req.body {
        username: '',
        password: ''
    }
    if existing user, sends: {
        username: '',
        password: ''
    }

app.delete('/auth/logout')

    controller: (req, res) => {
        const {destroy} = req.session
        destroy()
        res.sendStatus(200)
    }

app.put('/auth/user) 

    receives: req.body {
        username: ''
    }
    sends: (req, res) {
        const db = req.app.get('db)
        const {id} = req.params
        const {username} = req.body
        let data = await db.update_user(id, username)
        res.status(200).send(data)
    }
```

### Samples/Sample-Packs

```javascript
app.post('/api/sample')

    receives: req.body {
        name: '',
        key: '',
        bpm: '',
        genre: '',
        instrument: '',
        type: '',
        sampleUrl: ''
    }
    sends: async (req, res) => {
        const db = app.get('db')
        const {id} = req.session.user
        const {name, key, bpm, genre, instrument, type} = req.body
        let newSample = await db.create_sample(name, bpm, genre, instrument, type, id)
        if(newSample){
            res.sendStatus(200)
        }
    }

app.post('/api/samplePack')

    receives: req.body {
        samplePackPic: '',
        samplePackName: '',
        addedSamples: []
    }
    sends: async (req, res) => {
        const db = app.get('db')
        const {id} = req.session.user
        const {samplePackPic, samplePackName, addedSamples} = req.body
        let newSamplePack = await db.create_sample_pack(samplePackPic, samplePackName, addedSamples, id)
        if(newSamplePack){
            res.sendStatus(200)
        }
    }

app.get('/api/samples')

    controller: async (req, res) => {
        const db = req.app.get('db')
        let samples = await db.get_samples()
        res.status(200).send(samples) 
    }

app.get('/api/samplePacks')

    controller: async (req, res) => {
        const db = req.app.get('db')
        let samplePacks = await db.get_sample_packs()
        res.status(200).send(samplePacks) 
    }

app.get('/api/sample/:sampleId')

    controller: async (req, res) => {
        const db = req.app.get('db')
        const {sampleId} = req.params
        let sample = await db.get_sample(sampleId)
        res.status(200).send(sample) 
    }

app.get('/api/samplePack/:samplePackId')

    controller: async (req, res) => {
        const db = req.app.get('db')
        const {samplePackId} = req.params
        let samplePack = await db.get_sample_pack(samplePackId)
        res.status(200).send(samplePack) 
    }
```
## DB Schema
```sql
create table user (
    id serial primary key,
    username varchar(30),
    password varchar(30),
    email text
)
create table samples (
    id serial primary key,
    name varchar(25),
    key varchar(2),
    type_id int references type(id),
    genre_id int references genre(id),
    instrument int references instrument(id),
    user_id int references user(id),
    sample_pointer text
)
create table type (
    id serial primary key,
    sample_type text
)
create table instrument (
    id serial primary key, 
    instrument text
)
create table genre (
    id serial primary key, 
    genre text
)
create table samplePack (
    id serial primary key,
    name varchar(40)
)
create table samplePackContents (
    id serial primary key
    sample_pack_id int references samplePack(id)
    sample_id int references samples(id)
)
```

## Project Points
- Core: 35
- Additional Tech: 30 (other libraries pending)
- Hosting: 15
- Presentation: 5

### Total: 85 (pending)