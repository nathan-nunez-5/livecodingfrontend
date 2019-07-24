console.log(document.getElementById('up_code').value)
var lock = false
function sendPost(){
  if (lock) {return;}
  lock = true
  var code = document.getElementById('up_code').value
  var examples = document.getElementById('up_examples').value
  if(code == '' || examples == ''){ console.log('return'); lock = false; return }
  var params = {
    up_code: code,
    up_examples: examples
  }
  var path = '/'
  console.log(ajaxCall(path, params))//trying to get this to work but so far nothing
  lock = false
}
