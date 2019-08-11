//comments will look like this that way you can just copy paste everything from this doc
//into your javascript file

//step 0: get node packages i.e. code written by other people/companies

var boxSDK = require('box-node-sdk');    //we may have to download a file to get this to work
var fs = require('fs');
//var path = require('path');

//step 1: get access to the correct box account (auth + folder id)

var sdk = new boxSDK({
  clientID: ‘9vtmen6j1xijpcxgjdhg1kiurpw490lq’,
  clientSecret: ‘HH8XNinKrFwpWdUidomlkGatbzwJErAe’,
});

var client = sdk.getPersistentClient(tokenInfo, null);
//step 2: get folder id  still figuring this out
var folderID = ?????
//step 3: read file

var fileContents = fs.createReadStream('/path/to/My File.mp4');

//step 4: upload file
var fileName = ‘MyFile.mp4’
client.files.uploadFile(folderID, fileName, fileContents)
    .then(fileObject => { /* ???? */ })
    .catch(error => { console.log(‘found error’) });

//something to look at that might help
