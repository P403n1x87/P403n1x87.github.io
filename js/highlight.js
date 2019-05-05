function addEvent(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;

  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  }
};

function removeEvent(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;

  if (object.removeEventListener) {
    object.addEventListener(type, callback);
  } else if (object.attachEvent) {
    object.detachEvent("on" + type, callback);
  }
}

function resize() {
  var width = $(".post").width();

  $('.highlight').each(function(i, obj) {
    $(this).width(width + "px");
  });
}

addEvent(window, "resize", function () { resize() });

resize();
