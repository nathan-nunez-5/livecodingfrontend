$(document).ready(function(){
  $('#up_code').on('input', function(){
    sendPost();
  })
  $('#up_examples').change(function(){
    sendPost();
  })
})
