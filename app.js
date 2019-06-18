var express = require('express')
var http = require('http')
var fs = require('fs')
var bodyParser = require('body-parser')
var app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 80
//const hostname = '134.209.219.236';

app.listen(port)

//read up on this
var mkdirp = require('mkdirp')
mkdirp('tmp', function(err) {

    // path exists unless there was an error

});

console.log('now listening to port ' + port)

app.use('/assets', express.static('assets'))

app.set('view engine', 'ejs')

app.get('/', function(request, response){
	console.log('request was made: ' + request.url)
	response.send('hi team! this is the homepage')
})

app.get('/testing', function(request, response){
	console.log('request was made: ' + request.url)
	var start_code = ''
	var start_examples = ''
	// var items = fs.readdirSync('./tmp')
	// console.log(items)
	// if(items.includes('code.txt')){
	// 	start_code = fs.readFileSync('./tmp/code.txt', 'utf8')
	// 	console.log('code.txt has been uploaded')
	// }
	// if(items.includes('examples.txt')){
	// 	start_examples = fs.readFileSync('./tmp/examples.txt', 'utf8')
	// 	console.log('examples.txt has been uploaded')
	// }
	var up = {
		code: start_code,
		examples: start_examples,
	}
	response.render('testing', {up: up});
	// console.log(up)

})

var backendFxns = require('live-backend-nfn5')
var parseExamples = backendFxns.parseExamples
var writeExamples = backendFxns.writeExamples
var reeval = backendFxns.reeval //dont think this works tbh
//var updateCodeEvalJS = backendFxns.updateCodeEvalJS

app.post('/testing', urlencodedParser, function(request, response){
	console.log('request (post) was made: ' + request.url);
	//console.log(request.body)

	//grab text bodies
	var up_code = request.body.up_code;
	var up_examples = request.body.up_examples;

	//savefiles in hidden folder tmp
	fs.writeFileSync('tmp/code.js', up_code)
	fs.writeFileSync('tmp/code.js.examples', up_examples)
	// console.log(up_code)
	// console.log(up_examples)

	//the atom interface we need trim before we parse
	//write parseExamples
	var newExamples = writeExamples(reeval(up_code, parseExamples(up_examples)))
	var up = {
		code: up_code,
		examples: newExamples
	}


	response.render('testing', {up: up});

});
