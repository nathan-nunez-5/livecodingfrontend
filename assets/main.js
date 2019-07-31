$(document).ready(function(){
  //codemirror orginall from cm.js
  var codeArea = $("#up_code")[0]
  var editor = CodeMirror.fromTextArea(codeArea, {
    lineNumbers : true,
    mode : "javascript"
  })
  editor.on('inputRead', function(editor, change){
    var doc = editor.getDoc()
    sendPost(doc)
  })

  $('#up_examples').change(function(){
     var doc = editor.getDoc()
     sendPost(doc)
   })
   $('#up_examples').keydown(function(e){
     if(e.which == 61){
       var doc = editor.getDoc()
       sendPost(doc)
     }

    })
   //triggers
   // $('#up_code').on('input',function(editor){
   //    console.log('gotcode')
   //    sendPost()
   //  })
   //  $('#up_examples').change(function(editor){
   //     console.log('gotex')
   //     sendPost()
   //   })
})

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
      // <tr>
      //   <th scope="row">1</th>
      //   <td>Mark</td>
      //   <td>Otto</td>
      //   <td>@mdo</td>
      // </tr>
      // <tr>
      //   <th scope="row">2</th>
      //   <td>Jacob</td>
      //   <td>Thornton</td>
      //   <td>@fat</td>
      // </tr>
      // <tr>
      //   <th scope="row">3</th>
      //   <td>Larry</td>
      //   <td>the Bird</td>
      //   <td>@twitter</td>
      // </tr>
    html_string += " </tbody></table>"
    $('#io_container').append(html_string)

  }


}
