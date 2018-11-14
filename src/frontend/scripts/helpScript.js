$(document).ready(function() {
  alert("something");
  setUpMenu();

  function setUpMenu() {
    $("#helpMenuOptions").accordion({
      collapsible: true,
      active: false //Can be set to number
    });
  }
});
