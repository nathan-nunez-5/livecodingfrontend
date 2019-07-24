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

function ajaxCall(path, params, method = 'POST'){
  console.log('ajax')
  var xhr = new XMLHttpRequest()
  xhr.open(method, path)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  console.log(JSON.stringify(params))

  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var up = JSON.parse(xhr.responseText)
      document.getElementById('up_code').value = up.code
      document.getElementById('up_examples').value = up.examples
    }
  }
  xhr.send("user_program="+JSON.stringify(params))
}
