console.log(document.getElementById('up_code').value)
var lock = false
function sendPost(){
  if (lock) {console.log('returning'); return;}
  lock = true
  var code = document.getElementById('up_code').value
  var examples = document.getElementById('up_examples').value
  // console.log('hello')
  // console.log(code)
  // console.log(examples)
  if(code == '' || examples == ''){ console.log('return'); lock = false; return }
  var params = {
    up_code: code,
    up_examples: examples
  }
  var path = '/'
  post(path, params)
  lock = false
}
