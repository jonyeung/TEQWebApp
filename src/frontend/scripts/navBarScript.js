// This runs on every page other than the index.html
$(document).ready(function() {

  loadHeader();

  // Header click redirects to dashboard.
	$("header").on("click", function() {
		document.location.href = "dashboard.html";
	});

  // Loads the page header into the header tag.
  function loadHeader() {
    var content = "<h1><span id='teqHead'>Toronto East Quadrant</span>" +
    "<br><span id='lipHead'>Local Immigration Partnership</span></h1>" +
    "<button id='helpBtn'><img src=''></button>";
    $("header").empty();
    $("header").append(content);
  }

});
