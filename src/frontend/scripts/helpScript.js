$(document).ready(function() {
  setUpMenu();
});

function setUpMenu() {
  var userType = sessionStorage.userLevel;
  // Remove the help sections dependant on user type.
  if (userType == "support_agency") {
    $(".lowLevelHelp").remove();
    $(".midLevelHelp").remove();
    $(".highLevelHelp").remove();
  } else if (userType == "TEQ_low_level") {
    $(".midLevelHelp").remove();
    $(".highLevelHelp").remove();
  } else if (userType == "TEQ_mid_level") {
    $(".lowLevelHelp").remove();
    $(".highLevelHelp").remove();
  } else {
    $(".lowLevelHelp").remove();
  }
  // Set up the accordion.
  $("#helpMenuOptions").accordion({
    collapsible: true,
    active: false
  });
}