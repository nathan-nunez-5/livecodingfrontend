/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function post(path, params, method ='post') {
  console.log('we posting up')
  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}

function ajaxCall(path, params, /*doc,*/ method = 'POST'){
  var xhr = new XMLHttpRequest()
  var unlocked = true
  xhr.open(method, path)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var up = JSON.parse(xhr.responseText)
      document.getElementById('up_code').value = up.code
      //doc.setValue(up.code)
      document.getElementById('up_examples').value = up.examples
    }
  }
  var json = JSON.stringify(params)
  //we encode so that we don't lose our '+' char
  xhr.send("user_program="+ encodeURIComponent(json))
}
