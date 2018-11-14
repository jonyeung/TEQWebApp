// This runs on every page other than the index.html
$(document).ready(function() {

  loadHeader();
  loadHelp();

  // Header title click redirects to dashboard.
	$("#pageTitle").on("click", function() {
		document.location.href = "dashboard.html";
	});

  // Help click opens the help menu
  $("#helpBtn").on("click", function() {
    $("#helpMenu").toggle("slide", {direction: "right"}, 1000);
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
    var content = "<div id='helpMenu'>" +
    "<span class='close' id='helpClose'>&times;</span></div>" +
    "<div id='helpMenuContent'><object data='help.html'></object></div>";
    $("body").append(content);
    $("#helpMenu").hide();
    $("#helpMenuContent").children().hide();
  }

});
