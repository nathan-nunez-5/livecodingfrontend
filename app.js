var express = require('express')
var http = require('http')
var fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 80
app.listen(port);
//console.log('now listening to port ' + port)

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
    //console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    //console.log('cookie exists', cookie);
  }
  next(); // <-- important!You can achieve this by using ajax and history.pushState( ) function.
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
	var start_code = ''
	var start_examples = ''
	var up = {
		code: start_code,
		examples: start_examples,
	}
	response.render('livedefault', {up: up});

})

var backendFxns = require('live-backend-nfn5')
var parseExamples = backendFxns.parseExamples
var writeExamples = backendFxns.writeExamples
var reeval = backendFxns.reeval
var updateCodeEvalJS = backendFxns.updateCodeEvalJS


app.post('/', urlencodedParser, function(request, response){
	console.log('request (post) was made: ' + request.url);
  var parsedProgram = JSON.parse(request.body.user_program)
	var up_code = parsedProgram.up_code
	var up_examples = parsedProgram.up_examples
  var mode = parsedProgram.mode //'pbe' or 'eval'

	//savefiles in hidden folder tmp
	var userFolder = 'tmp/' + request.cookies.uCookie + '/'
	fs.writeFileSync(userFolder + 'code.js', up_code)
	fs.writeFileSync(userFolder + 'code.js.examples', up_examples)
  var path = userFolder +'code.js.sl'

  //reeval/pbe
  var res = updateCodeEvalJS(up_code, parseExamples(up_examples.trim()), path)
  var up = parseResponse(up_code, up_examples, res, mode)
	response.send(up);
});



app.get('/problems/:key', function(request, response){
  var problem_key = request.params.key - 1
  var problemhashtable = ['problem1_', 'problem2_', 'problem3_', 'problem4_']
  var problem_name = problemhashtable[problem_key]
  if(problem_name == null){
    response.send('no problem here sorry')
  }

  var description = ''
  var start_code = ''
	var start_examples = ''
  var samples = ''
	var items = fs.readdirSync('./.problems')

  //description
  if(items.includes(problem_name +'description.txt')){
		description = fs.readFileSync('./.problems/'+ problem_name +'description.txt', 'utf8')
	}else {
    console.log('we missing:' + problem_name +'description.txt')
  }
  //code
	if(items.includes(problem_name +'code.js')){
		start_code = fs.readFileSync('./.problems/'+ problem_name +'code.js', 'utf8')
	}else {
    console.log('we missing:' + problem_name +'code.js')
  }
  //samples
	if(items.includes(problem_name +'samples.json')){
		var raw_samples = fs.readFileSync('./.problems/'+ problem_name +'samples.json', 'utf8')
    samples = JSON.stringify(raw_samples)
	}else {
    console.log('we missing:' + problem_name +'samples.json')
  }

	var data = {
    description: JSON.stringify(description),
		code: start_code,
		examples: start_examples,
    samples: samples
	}
	response.render('liveproblems', {data: data});

})



app.post('/problems/:key', urlencodedParser, function(request, response){
  var problem_key = request.params.key - 1
  var problemhashtable = ['problem1_', 'problem2_', 'problem3_', 'problem4_']
  var problem_name = problemhashtable[problem_key]
  if(problem_name == null){
    response.send('no problem here sorry')
  }
	console.log('request (post) was made: ' + request.url);
  var parsedProgram = JSON.parse(request.body.user_program)
	var up_code = parsedProgram.up_code
	var up_examples = parsedProgram.up_examples
  var mode = parsedProgram.mode //'pbe' or 'eval'

	var userFolder = 'tmp/' + request.cookies.uCookie + '/'
	fs.writeFileSync(userFolder + problem_name +'code.js', up_code)
	fs.writeFileSync(userFolder + problem_name +'code.js.examples', up_examples)
  var path = userFolder +problem_name +'code.js.sl'

  var res = updateCodeEvalJS(up_code, parseExamples(up_examples.trim()), path)
  var up = parseResponse(up_code, up_examples, res, mode)
	response.send(up);
});



app.get('/tutorial', function(request, response){
  var problem_name = 'tutorial_'

  var description = ''
  var start_code = ''
	var start_examples = ''
  var samples = ''
	var items = fs.readdirSync('./.problems')
	//console.log(items)

  //description
  if(items.includes(problem_name +'description.txt')){
		description = fs.readFileSync('./.problems/'+ problem_name +'description.txt', 'utf8')
		//console.log('description has been uploaded')
	}else {
    console.log('we missing:' + problem_name +'description.txt')
  }
  //code
	if(items.includes(problem_name +'code.js')){
		start_code = fs.readFileSync('./.problems/'+ problem_name +'code.js', 'utf8')
		//console.log('code has been uploaded')
	}else {
    console.log('we missing:' + problem_name +'code.js')
  }
  //samples
	if(items.includes(problem_name +'samples.json')){
		var raw_samples = fs.readFileSync('./.problems/'+ problem_name +'samples.json', 'utf8')
    samples = JSON.stringify(raw_samples)
	}else {
    console.log('we missing:' + problem_name +'samples.json')
  }

	var data = {
    description: JSON.stringify(description),
		code: start_code,
		examples: start_examples,
    samples: samples
	}
	response.render('livetutorial', {data: data});

})



app.post('/tutorial', urlencodedParser, function(request, response){
  var problem_name = 'tutorial_'
	console.log('request (post) was made: ' + request.url);
  var parsedProgram = JSON.parse(request.body.user_program)
	//grab text bodies
	var up_code = parsedProgram.up_code
	var up_examples = parsedProgram.up_examples
  var mode = parsedProgram.mode //'pbe' or 'eval'

	//savefiles in hidden folder tmp
	var userFolder = 'tmp/' + request.cookies.uCookie + '/'
	fs.writeFileSync(userFolder + problem_name +'code.js', up_code)
	fs.writeFileSync(userFolder + problem_name +'code.js.examples', up_examples)
  var path = userFolder +problem_name +'code.js.sl'

  var res = updateCodeEvalJS(up_code, parseExamples(up_examples.trim()), path)
  var up = parseResponse(up_code, up_examples, res, mode)
	response.send(up);

});



function parseResponse(up_code, up_examples, res, mode){
  if(mode == 'eval' || mode == "equal eval"){
    console.log('in eval')
    if (res.newExamples != null) {//eval sucess
      var up = {
        change: 'reeval',
        code: up_code,
        examples: writeExamples(res.newExamples)
      }
    }else{//eval error
      var up = {
        change: 'code eval error',
        code: up_code,
        examples: up_examples
      }
    }
  }
  else{ //mode == 'pbe' (there are only two modes)
    console.log('in pbe')
    if (res.newCode != null && res.newCode != up_code) {//pbe success
      console.log('s')
      var up = {
        change: 'pbe',
    		code: res.newCode,
    		examples: up_examples
      }
    }else  if (res.newExamples === null && res.newCode == up_code){//pbe failed (res.newExamples === null && res.newCode == up_code)
      console.log('e')
      var up = {
        change: 'pbe synth error',
        code: up_code,
        examples: up_examples,
        pbeStatus: "pbe synthesis failed, please try new examples"
      }
    }
    else{
      console.log('d')
      var up = {
        change: 'pbe no change',
        code: up_code,
        examples: up_examples,
      }
    }
  }
  return up
}
