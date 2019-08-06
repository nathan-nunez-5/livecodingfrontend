var lock = false
//focus is 'eval' or 'pbe'
function sendPost(doc, focus){
  if (lock) {return;}
  lock = true
  if(doc != null){
    var code = doc.getValue()
  }
  else{
    var code = $('#up_code').val()
  }
  //doc.getValue()
  var examples = $('#up_examples').val()
  if(code == '' || examples == ''){lock = false; return }
  var params = {
    up_code: code,
    up_examples: examples,
    mode: focus
  }
  //use comments to check if we using the correct url
  var currenturl = document.URL
  //console.log(currenturl)
  var path = currenturl.replace('http://', '')
  //console.log(path)
  path = path.substring(path.indexOf('/'))
  //console.log(path)
  ajaxCall(path, params, doc)
  lock = false
}
