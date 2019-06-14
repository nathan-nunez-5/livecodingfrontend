var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = 80;
//const hostname = '134.209.219.236';

app.listen(port);

var mkdirp = require('mkdirp');
mkdirp('tmp', function(err) {

    // path exists unless there was an error

});

console.log('now listening to port ' + port);

app.use('/assets', express.static('assets'));

app.set('view engine', 'ejs');

app.get('/', function(request, response){
	console.log('request was made: ' + request.url);
	response.send('hi team! this is the homepage');
});

app.get('/testing', function(request, response){
	console.log('request was made: ' + request.url);
	//response.sendFile(__dirname + '/testing.html');
	response.render('testing', {up: request.query, data_transcript: 'this is some testing value: ', data_value: 42});

});

var backendFxns = require('live-backend-nfn5')

var reeval = backendFxns.reeval
var updateCodeEvalJS= backendFxns.updateCodeEvalJS

app.post('/testing', urlencodedParser, function(request, response){
	console.log('request(post) was made: ' + request.url);
	var up_code = request.body.user_program_code;
	var up_examples = request.body.user_program_examples;
	fs.writeFile('tmp/code.txt', up_code, (err) => {
		if (err) throw err;
		console.log('code.txt has been saved');
	});
	fs.writeFile('tmp/examples.txt', up_examples, (err) => {
		if (err) throw err;
		console.log('examples.txt has been saved');

	});
	var update = updateCodeEvalJS(up_code, up_examples, './tmp/newcode.txt')
	console.log(update)
	console.log(update.newCode)
	console.log(update.newExamples)
	response.render('testing', {up: request.query, ne: update.newExamples});

});
