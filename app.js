var express = require('express')
var http = require('http')
var fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 80
app.listen(port);
//console.log('now listening to port ' + port)

//read up on this
var mkdirp = require('mkdirp')
mkdirp('tmp', function(err) {
    // path exists unless there was an error
});

//app.use('/assets', express.static('assets'))
app.set('view engine', 'ejs')
app.use(cookieParser());

app.use(function (request, response, next) {
  // check if client sent cookie
  var cookie = request.cookies.uCookie;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2,randomNumber.length);
    response.cookie('uCookie',randomNumber);
    console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});

// let static middleware do its job
app.use(function (request, response, next){
	var userFolder = 'tmp/' + request.cookies.uCookie
  if(userFolder !== undefined){
		mkdirp(userFolder, function(err) {
			//path exists unless it don't
		})
	}


	next();
});

app.use('/assets', express.static('assets'))

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
var reeval = backendFxns.reeval
var updateCodeEvalJS = backendFxns.updateCodeEvalJS

app.post('/testing', urlencodedParser, function(request, response){
	console.log('request (post) was made: ' + request.url);
	//console.log(request.body)

	//grab text bodies
	var up_code = request.body.up_code;
	var up_examples = request.body.up_examples;

	//savefiles in hidden folder tmp
	var userFolder = 'tmp/' + request.cookies.uCookie + '/'
	console.log('this folder' + userFolder)
	fs.writeFileSync(userFolder + 'code.js', up_code)
	fs.writeFileSync(userFolder + 'code.js.examples', up_examples)
	// console.log(up_code)
	// console.log(up_examples)

	//the atom interface we need trim before we parse
	//write parseExamples
	//var newExamples = writeExamples(reeval(up_code, parseExamples(up_examples)))
	// var up = {
	// 	code: up_code,
	// 	examples: newExamples
	// }

  var path = userFolder +'code.js.sl'
	//console.log("begin: updateCodeEvalJS")
  var res = updateCodeEvalJS(up_code, parseExamples(up_examples), path)

    if (res.newCode != null && res.newCode != up_code) {
      var up = {
    		code: res.newCode,
    		examples: up_examples
    	}
      //setCode(pbeFile, res.newCode);
    }
    if (res.newExamples != null) {
      var up = {
    		code: up_code,
    		examples: writeExamples(res.newExamples)
    	}
      //setExamples(res.newExamples);
    }


	response.render('testing', {up: up});

});
