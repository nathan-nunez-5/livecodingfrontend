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

function ajaxCall(path, params, doc, method = 'POST'){
  var xhr = new XMLHttpRequest()
  var unlocked = true
  xhr.open(method, path)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      var up = JSON.parse(xhr.responseText)
      switch (up.change) {
        case 'pbe':
          doc.setValue(up.code)
          break;
        case 'reeval':
          document.getElementById('up_examples').value = up.examples
          if(up.fixCursor != null || up.fixCursor != undefined){
            //console.log('hello')
            //console.log('ho', up.fixCursor)
            setCaretPosition('up_examples', up.fixCursor)

          }
          break;
        case 'pbe synth error':
          alert("pbe synthesis failed to generate a function")
          break;
        case 'code eval error':
          break;
        default:
          //console.log("default msg")
          break;

      }
    }
  }
  var json = JSON.stringify(params)
  //we encode so that we don't lose our '+' char
  xhr.send("user_program="+ encodeURIComponent(json))
}


// from https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox
function setCaretPosition(elemId, caretPos) {
    var el = document.getElementById(elemId);

    el.value = el.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if (el !== null) {

        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', caretPos);
            range.select();
            return true;
        }

        else {
            // (el.selectionStart === 0 added for Firefox bug)
            if (el.selectionStart || el.selectionStart === 0) {
                el.focus();
                el.setSelectionRange(caretPos, caretPos);
                return true;
            }

            else  { // fail city, fortunately this never happens (as far as I've tested) :)
                el.focus();
                return false;
            }
        }
    }
}
