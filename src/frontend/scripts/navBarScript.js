$(document).ready(function()) {
  // Header click redirects to dashboard.
	$("header").not("#loginHeader").on("click", function() {
		document.location.href = "dashboard.html";
	});
}
