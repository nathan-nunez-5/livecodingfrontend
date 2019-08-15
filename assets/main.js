$(document).ready(function(){
  //codemirror orginall from cm.js
  var codeArea = $("#up_code")[0]
  var editor = CodeMirror.fromTextArea(codeArea, {
    lineNumbers : true,
    matchBrackets : true,
    autoCloseBrackets : true,
    mode : "javascript"
  })
  editor.on('inputRead', function(editor, change){
    var doc = editor.getDoc()
    sendPost(doc, 'eval', 'live code eval')
  })
  //lose focus synthesis
  $('#up_examples').change(function(){
    var ex_text = $('#up_examples').val()
    var doc = editor.getDoc()
    sendPost(doc, 'pbe', 'window lost focus pbe')
   })

   //character dependent live triggers
   $('#up_examples').keydown(function(e){
     //console.log(e)
     var keyPressedValue = e.originalEvent.key
     // =-evaluation
     if(keyPressedValue == "="){
       var doc = editor.getDoc()
       sendPost(doc, 'pbe', 'equal eval')
     }
     //enter-synthesis
     if(keyPressedValue == "Enter"){
       var doc = editor.getDoc()
       sendPost(doc, 'pbe', 'newline pbe')
     }
   })

   //detects change in example input, fires evaluation
  $('#up_examples').on('input', function(e){
    var ex_text = $('#up_examples').val()
    var cursorPos = $('#up_examples')[0].selectionStart
    if(ex_text.charAt(cursorPos - 1) != '\n'){//last key pressed was not enter
      console.log("engaged")
      var ex_lines = ex_text.split('\n')
      if(ex_lines.length == 1){
        var currLine = ex_text
        var inLineCursorPos = cursorPos
      }else{
        var beforeCursor = ex_text.substring(0, cursorPos)
        var lastNew = beforeCursor.lastIndexOf('\n')
        var prevLinesBuffer = beforeCursor.substring(0, lastNew+1).length
        var numOfPreviousLines = (beforeCursor.match(/\n/g) || '').length
        var currLine = ex_lines[numOfPreviousLines]
        var inLineCursorPos = cursorPos - (lastNew + 1)
      }
      var openParen = currLine.indexOf('(')
      var closeParen = currLine.indexOf(')')
      if((openParen + 1) != closeParen && (openParen < inLineCursorPos && inLineCursorPos <= closeParen)){
        var doc = editor.getDoc()
        sendPost(doc, 'pbe', 'changed input eval', cursorPos)
      }
    }
  })
}) //end of jquery triggers

function renderTable(samples){
  //console.log(samples)
  var sample_json = JSON.parse(samples)
  //console.log(sample_json)
  var html_string = ""
  var rows = sample_json.sample_num

  if(samples == null || rows == 0){
    html_string = '<p>no examples present</p>'
    $('#io_container').append(html_string)
  }
  else{
    html_string += "<table class=\"table\"> <thead> <tr><th scope=\"col\">#</th><th scope=\"col\">Input(s)</th><th scope=\"col\">Output</th></tr> </thead>"
    html_string += "<tbody>"
    for(var i = 0; i < rows; i++){
      var io_object = sample_json.sample_pairs[i]
      var input = io_object.input
      var output = io_object.output
      var rowNum = i+1
      var substring = "<tr>  <th scope=\"row\">" + (i+1) +"</th>"
      substring += "<td>" + input + "</td> <td> " + output + "</td>"
      substring += "</tr>"

      html_string += substring
    }
    html_string += " </tbody></table>"
    $('#io_container').append(html_string)
  }
}

function renderDescription(desc){
  $('#desc_container').append(desc)
}
