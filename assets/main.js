$(document).ready(function(){
  //codemirror orginall from cm.js
  // var code = $("#up_code")[0]
  // var editor = CodeMirror.fromTextArea(code, {
  //   lineNumbers : true,
  //   mode : "javascript"
  // })
  //triggers originally from triggers.js
  $('#up_code').on('input', function(){
    console.log('gotcode')
    sendPost();
  })
  $('#up_examples').change(function(){
    console.log('gotex')
    sendPost();
  })
})
