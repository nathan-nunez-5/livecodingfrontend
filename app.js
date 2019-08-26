var express = require('express')
var http = require('http')
var fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var json2csv = require('json2csv')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//paths for data
var dataPath = 'tmp'
var logsPath = dataPath + '/logs'

//csv vars
var csvFields = ['Timestamp', 'Active_Window', 'Eval_or_PBE', 'Change_Tag', /*'Changed_Content',*/ 'Success_Tag']
var newLine = '\r\n'

const port = 80
app.listen(port);
//console.log('now listening to port ' + port)

var mkdirp = require('mkdirp')
mkdirp(dataPath, function(err) {
    // path exists unless there was an error
    if(err){
      console.log('no' + dataPath)
    }else{
      mkdirp(logsPath, function(err2){
        if(err2){
          console.log('no' + dataPath)
        }else{
          //console.log("csv/logs folder ");
          mkdirp(logsPath+'/p1', function(err2){
            if(err2){
              console.log('no p1')
            }else{
            }
          })
          mkdirp(logsPath+'/p2', function(err2){
            if(err2){
              console.log('no p2')
            }else{
            }
          })
          mkdirp(logsPath+'/p3', function(err2){
            if(err2){
              console.log('no p3')
            }else{
            }
          })
          mkdirp(logsPath+'/p4', function(err2){
            if(err2){
              console.log('no p4')
            }else{
            }
          })
          mkdirp(logsPath+'/p5', function(err2){
            if(err2){
              console.log('no p5')
            }else{

            }
          })
        }
      })
    }
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
	var userFolder = dataPath +'/' + request.cookies.uCookie
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
  var trigger = parsedProgram.trigger //'pbe' or 'eval'
  var cursorPos = parsedProgram.cursorPos

	//savefiles in hidden folder tmp
	var userFolder = dataPath + '/' + request.cookies.uCookie + '/'
	fs.writeFileSync(userFolder + 'code.js', up_code)
	fs.writeFileSync(userFolder + 'code.js.examples', up_examples)
  var path = userFolder +'code.js.sl'

  //reeval/pbe
  var res = updateCodeEvalJS(up_code, parseExamples(up_examples.trim()), path)
  var up = parseResponse(up_code, up_examples, res, trigger, cursorPos)
	response.send(up);
});



app.get('/problems/:key', function(request, response){
  var problem_key = request.params.key - 1
  var problemhashtable = ['problem1_', 'problem2_', 'problem3_', 'problem4_', 'problem5_']
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

  var csvPath = logsPath + '/p'+ request.params.key + '/' + request.cookies.uCookie + '.csv'
  var logPath = csvPath.slice(0,-4) + '.log'


  fs.access(csvPath, fs.constants.F_OK, (err) => {
    if(err){
      //file missing
      fs.writeFile(csvPath, (csvFields + newLine), (err) => {
        if(err){
          console.log('err:' + err)
        }
      })
    }else{
      //delete files
      fs.unlink(csvPath, (err) => {
        if(err){
          console.log('err:' + err)
        }else{
          fs.writeFile(csvPath, (csvFields + newLine), (err) => {
            if(err){
              console.log('err:' + err)
            }
          })
        }
      })
    }
  });
  fs.access(logPath, fs.constants.F_OK, (err) => {
    if(err){
      //
    }
    else {
      fs.unlink(logPath, (err) => {
        if(err){return err}
      })
    }
  })
	response.render('liveproblems', {data: data});

})



app.post('/problems/:key', urlencodedParser, function(request, response){
  var problem_key = request.params.key - 1
  var problemhashtable = ['problem1_', 'problem2_', 'problem3_', 'problem4_', 'problem5_']
  var problem_name = problemhashtable[problem_key]
  if(problem_name == null){
    response.send('no problem here sorry')
  }
	console.log('request (post) was made: ' + request.url);
  var parsedProgram = JSON.parse(request.body.user_program)
	var up_code = parsedProgram.up_code
	var up_examples = parsedProgram.up_examples
  var trigger = parsedProgram.trigger //'pbe' or 'eval'
  var cursorPos = parsedProgram.cursorPos


	var userFolder = dataPath +'/' + request.cookies.uCookie + '/'
	fs.writeFileSync(userFolder + problem_name +'code.js', up_code)
	fs.writeFileSync(userFolder + problem_name +'code.js.examples', up_examples)
  var path = userFolder +problem_name +'code.js.sl'

  var res = updateCodeEvalJS(up_code, parseExamples(up_examples.trim()), path)
  var up = parseResponse(up_code, up_examples, res, trigger, cursorPos)


  var csvPath = logsPath + '/p'+ request.params.key + '/' + request.cookies.uCookie + '.csv'
  var tStamp = Date.now()
  var active_window = parsedProgram.active_window + " window"
  var eval_or_pbe = (trigger.slice(-3) == 'pbe') ? 'pbe synthesis' : 'live evaluation'
  if(up.change.slice(-5) == 'error'){
    change_tag = 'no change'
    success_tag = 'failure'
  }else{
    success_tag = 'success'
    if(up.change == 'pbe no change'){
      change_tag = 'no change'
    }
    else{
      change_tag = up.change
    }
  }

  var logPath = csvPath.slice(0,-4) + '.log'

  //protosaveData(csvPath, tStamp, active_window, eval_or_pbe, change_tag, success_tag)
  saveData(csvPath, logPath, tStamp, active_window, eval_or_pbe, change_tag, success_tag, trigger,
    up_code, up_examples, up.code, up.examples)
	response.send(up)
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
  var trigger = parsedProgram.trigger //'pbe' or 'eval'
  var cursorPos = parsedProgram.cursorPos

	//savefiles in hidden folder tmp
	var userFolder = dataPath +'/' + request.cookies.uCookie + '/'
	fs.writeFileSync(userFolder + problem_name +'code.js', up_code)
	fs.writeFileSync(userFolder + problem_name +'code.js.examples', up_examples)
  var path = userFolder +problem_name +'code.js.sl'

  var res = updateCodeEvalJS(up_code, parseExamples(up_examples.trim()), path)
  var up = parseResponse(up_code, up_examples, res, trigger, cursorPos)
	response.send(up);

});

function parseResponse(up_code, up_examples, res, trigger, cursorPos){
  //possible triggers {'live code eval', 'window lost focus pbe', 'equal eval', 'newline pbe', 'changed input eval'}
  if(trigger == 'live code eval' || trigger == "equal eval" || trigger == "changed input eval"){
    console.log('in eval')
    if (res.newExamples != null) {//eval sucess
      var up = {
        change: 'reeval',
        code: up_code,
        examples: writeExamples(res.newExamples),
        fixCursor: ((trigger == 'changed input eval') ? cursorPos : null)
      }
    }else{//eval error
      var up = {
        change: 'code eval error',
        code: up_code,
        examples: up_examples,
        fixCursor: ((trigger == 'changed input eval') ? cursorPos : null)
      }
    }
  }
  else{ //trigger == 'pbe'
    console.log('in pbe')
    if (res.newCode != null && res.newCode != up_code) {//pbe success
      var up = {
        change: 'pbe',
    		code: res.newCode,
    		examples: up_examples
      }
    }else  if (res.newExamples === null && res.newCode == up_code){//pbe failed (res.newExamples === null && res.newCode == up_code)
      var up = {
        change: 'pbe synth error',
        code: up_code,
        examples: up_examples,
        pbeStatus: "pbe synthesis failed, please try new examples"
      }
    }
    else{
      var up = {
        change: 'pbe no change',
        code: up_code,
        examples: up_examples,
      }
    }
  }
  return up
}

/**
  * @desc saves 2 log files, csv that is easy to parse (timestamp, active_window, change_tag, eval_or_pbe, success_tag\n),
  *       and a more detailed log file that saves current instances of program before and after processing codetith
  *      log file format: @$timestamp $post_trigger request was received in active window $active_window.\n
  *      \treceived incoming code: $incoming_code and incoming_examples $incoming_examples\n
  *      \tperformed $eval_or_pbe with $success_tag\n
  *      \tstatus: $change_tag change with outcoming code: $outcoming_code and outcoming_examples $outcoming_examples\n
  */
function saveData(csvPath, logPath, timestamp, active_window, eval_or_pbe, change_tag, success_tag, post_trigger, incoming_code, incoming_examples, outcoming_code, outcoming_examples)
{
  var appendingToLog = `@${timestamp} ${post_trigger} request was received in ${active_window}.
    incoming code:
    ${incoming_code}incoming_examples:
    ${incoming_examples}
    performed ${eval_or_pbe} with ${success_tag}.
    status: ${(change_tag == 'no change') ? 'no change' : 'user program updated with ' + change_tag}.
    outcoming code:
    ${outcoming_code}outcoming_examples
    ${outcoming_examples}\n\n`;

  fs.appendFile(logPath, appendingToLog, function (err) {
      if (err) throw err;
      //console.log('The log was appended to file!');
  });
  var appendingData = [
    {
    'Timestamp' : timestamp,
    'Active_Window' : active_window,
    'Eval_or_PBE' : eval_or_pbe,
    'Change_Tag' : change_tag,
    /*'Changed_Content' : changed_content,*/
    'Success_Tag' : success_tag
    }
  ]
  var readyCSV = json2csv.parse(appendingData, {field: csvFields, header: false}) + newLine
  fs.appendFile(csvPath, readyCSV, function (err) {
    if (err) throw err;
    //console.log('The "data to append" was appended to file!');
  });
}
