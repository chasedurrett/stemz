# Stemz
### Stemz is a web application that offers musicians and music producers a place to share their samples in a clear and free format. This site is intended for users who would like to share and download samples, but don't want to deal with a monthly subscription. Users can create a profile, upload individual sounds, download samples created by other users, and organize their favorite sounds across the site into sample-packs.

## MVP
- A user can create a profile, log in, and log out. The user profile will display all of the samples that user has uploaded and their created sample-packs.
- A user can upload individual samples and specify the genre, instrument, bpm, and type (loop or one-shot).
- A user can create a sample-pack (akin to a playlist) with their favorite samples from across the site. These can be their samples or samples uploaded by other users.
- A user can view a single sample-pack and see it's contents. 
- A user can search through all the samples on the site and filter by genre, type, instrument, and bpm.
- A user can delete samples that they have uploaded. 
- A user can download sounds.

## Extra features
- A beat sequencer created with the Web Audio API and Tone.js that gives users a place to be creative and sketch ideas. 

## Wireframe

## Components
- App.js: Functional. Holds routes, Header.js, and Nav.js. 
- Header.js: Stateful (dropdownSelected: false). Holds logo and the dropdown menu for the link to the user profile page. 
- Nav.js: Functional. Holds links to samplePackForm.js and uploadSampleForm.js, also links to other views (browse sample-packs & browse samples)
- samplePackForm.js: Stateful (sample-pack name and img, samples: [], selectedSamples: []). Holds post request and inputs to create a new sample pack, as well as a handleInput() function to update state. Also holds a get request inside of a componentDidMount to get all of the available samples to choose from, then maps over an array of samples including a button to push that sample to the selectedSample array on state. 
- uploadSampleForm.js: Stateful (name: '', bpm: ''). Hold post request to create a new sample and send it to the DB. Holds inputs and a respective handleInput() function. The rest of the inputs--bpm, instrument, and type--will be selected from dropdown menus. 
- SamplesDashboard.js: Stateful (samples: []). Will hold a get request in  a componentDidMount to get all of the samples to display and map over the array, returning Sample.js for each iteration. Will pass down info to Sample.js as props and a download function through props.
- Sample.js: Functional. Will display the sample name, instrument, type, genre, and bpm, and a download button.
- SamplePackDashboard.js: Stateful (samplePacks: []). Will hold a get request in a componentDidMount to grab all of the samplePacks to display on the front page.
- SamplePack.js: Functional. will display the sample-pack name and its contents. 