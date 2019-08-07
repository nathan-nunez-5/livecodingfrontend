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
