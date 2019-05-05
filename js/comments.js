/*
 * Local Helpers
 */
function showNotify(message, duration) {
  var x = document.getElementById("snackbar")

  x.className = "show";
  x.innerHTML = message;

  setTimeout(function(){ x.className = x.className.replace("show", ""); }, duration || 3000);
}

function disableButton() {
  var spinner       = '<img id="spinner" src="/images/spinner.gif" width="32px;" style="margin-right:12px;"/>'
  var submit_button = document.getElementById("btn-submit-comment")

  submit_button.disabled = true;
  submit_button.innerHTML = spinner + "SUBMITTING...";
}

function enableButton() {
  var submit_button = document.getElementById("btn-submit-comment")

  submit_button.disabled = false
  submit_button.innerHTML = "SUBMIT FOR APPROVAL"
}

function clearFields() {
  $("#comment").val("");
}

function sendToStaticman() {
  var url = "https://api.staticman.net/v2/entry/P403n1x87/thehubofheliopolis/master/comments"

  $.ajax({
    type        : "POST",
    url         : url,
    data        : $("#post-comment").serialize(),
    contentType : 'application/x-www-form-urlencoded',
    success     : function(data) {
      showNotify("Comment submitted successfully.", 3000);
      enableButton();
      clearFields();
      resetForm();
    },
    error       : function(data) {
      showNotify("An error occurred while submitting. Please try again later.", 3000);
      console.log("Staticman error code: " + data.responseJSON.errorCode);
      enableButton();
    }
  });
}


/*
 * Core function
 */
function submitComment() {
  // Show spinner in button
  submit_button = document.getElementById("btn-submit-comment")

  // Validate user input
  var name = $("#name")
  if (name.val() == "") {
    showNotify("The name is a mandatory field", 3000);
    name.focus();
    return;
  }

  var comment = $("#comment")
  if (comment.val() == "") {
    showNotify("The comment is a mandatory field", 3000);
    comment.focus();
    return;
  }

  // Set timestamp to current value just before submitting
  var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
  $("#timestamp").val(Math.round(timeStampInMs / 1000));

  // Send fields to Staticman
  disableButton();
  sendToStaticman();
}

function resetForm() {
  document.getElementById("comment-hdr").innerHTML = "Leave a comment";
  $("#parent").val(0);
}

function reply(name, ts) {
  var hdr = document.getElementById("comment-hdr");

  hdr.innerHTML = "Replying to " + name + ' <span class="action" onclick="resetForm();">RESET</span>';
  hdr.scrollIntoView(true);

  $("#parent").val(ts);
}
