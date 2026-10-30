// Progressive enhancements for the terminal theme. The pages work without it.
(function () {
  "use strict";

  // Highlight the table of contents entry for the section being read.
  var toc = document.getElementById("toc");
  if (toc) {
    var links = Array.prototype.slice.call(toc.querySelectorAll("a[href^='#']"));
    var targets = links.map(function (a) {
      return document.getElementById(decodeURIComponent(a.hash.slice(1)));
    });
    var current = null;
    var pending = false;

    var update = function () {
      pending = false;
      var active = null;
      for (var i = 0; i < targets.length; i++) {
        if (targets[i] && targets[i].getBoundingClientRect().top < 120) active = links[i];
      }
      if (active === current) return;
      if (current) current.classList.remove("current");
      if (active) active.classList.add("current");
      current = active;
    };

    window.addEventListener("scroll", function () {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  // Copy buttons on code blocks.
  if (navigator.clipboard) {
    document.querySelectorAll(".entry-content .highlight").forEach(function (block) {
      // Blocks with line numbers keep the code in the second table cell.
      var pre = block.querySelector("td.code pre") || block.querySelector("pre");
      if (!pre) return;
      var button = document.createElement("button");
      button.className = "copy";
      button.type = "button";
      button.textContent = "copy";
      button.addEventListener("click", function () {
        navigator.clipboard.writeText(pre.innerText.replace(/\n$/, "")).then(function () {
          button.textContent = "copied";
          setTimeout(function () { button.textContent = "copy"; }, 1500);
        });
      });
      block.appendChild(button);
    });
  }

  // less(1)-style paging: n for the next page, p for the previous one.
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.target.isContentEditable) return;
    if (/^(input|textarea|select)$/i.test(e.target.tagName)) return;
    var rel = { n: "next", p: "prev" }[e.key];
    var link = rel && document.querySelector(".pager a[rel='" + rel + "']");
    if (link) location.href = link.href;
  });
})();
