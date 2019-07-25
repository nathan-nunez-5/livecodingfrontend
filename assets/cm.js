$(document).ready(function(){
  var code = $("#up_code")[0]
  var editor = CodeMirror.fromTextArea(code, {
    lineNumbers : true,
    mode : "javascript"
  })
})
