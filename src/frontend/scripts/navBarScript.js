// This runs on every page other than the index.html
$(document).ready(function() {

  loadHeader();
  loadHelp();

  // Header click redirects to dashboard.
	$("header").on("click", function() {
		document.location.href = "dashboard.html";
	});

  // Loads the page header into the header tag.
  function loadHeader() {
    var content = "<img id='helpBtn' src='assets/help.png'>" +
    "<h1 id='pageTitle'><span id='teqHead'>Toronto East Quadrant</span>" +
    "<br><span id='lipHead'>Local Immigration Partnership</span></h1>";
    $("header").empty();
    $("header").append(content);
  }

  // Loads the help menu html into a new div with display none.
  function loadHelp() {
    var content = "<div id='helpMenu'></div>";
    $("body").append(content);
    $("#helpMenu").hide();
    $("#helpMenu").load("help.html");
  }

});
