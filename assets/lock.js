var lock = false
function sendPost(){
  if (lock) {return;}
  lock = true
  var code = $('#up_code').val()
  var examples = $('#up_examples').val()
  if(code == '' || examples == ''){lock = false; return }
  var params = {
    up_code: code,
    up_examples: examples
  }
  var path = '/'
  ajaxCall(path, params)
  lock = false
}
