const fs = require('fs')
const AWS = require('aws-sdk')
const { S3 } = require('aws-sdk')


const uploadFile = fileName => {

    const fileContent = fs.readFileSync(fileName)

    const params = {
        Bucket: stemz,
        Key: 'Auth.png',
        Body: fileContent
    }
    
    S3.upload(params, function(err, data){
        if(err){
            throw err
        }
        console.log(`File uploaded successfully, ${data.location}`)
    })
}

uploadFile('../../wireframe/Auth.png')