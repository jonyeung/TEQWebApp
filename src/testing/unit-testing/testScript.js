var newDiv = $('<div id="testDiv"></div>');
newDiv.appendTo("body");

QUnit.test("test for generateDropdown", function(assert){
  var expected = '<select class="changeLevelDropdown" id="levelDropdown" name="usertype"><option value=""' +
			'disabled selected>Pick a user type from the dropdown list...</option>' +
			'<option value="support_agency">Support Agency</option><option value="TEQ_low_level">TEQ Low Level</option>'+
			'<option value="TEQ_mid_level">TEQ Mid Level</option><option value="TEQ_high_level">TEQ High Level</option>'+
			'<option value="UTSC_staff">UTSC Project Staff</option></select>';
  var result = generateDropdown("levelDropdown");
  assert.equal(result, expected, "Passed!");
});

QUnit.test("test for setDashboard with support agency", function(assert){
  var content = $('<h1 id="loggedInAccessLevel"></h2>' +
  '<button id="uploadDataBtn">Upload</button><button id="queryDataBtn">Query</button>' +
  '<button id="registerUserBtn">Register</button><button id="changeUserBtn">Change</button>');
  content.appendTo("#testDiv");
  setDashboard("support_agency");
  var expected = "You are logged in as a: Support Agency";
  assert.equal($("#loggedInAccessLevel").text(), expected, "Passed!");
  assert.equal($("#queryDataBtn").is(':visible'), false, "Passed!");
  assert.equal($("#registerUserBtn").is(':visible'), false, "Passed!");
  assert.equal($("#changeUserBtn").is(':visible'), false, "Passed!");
  $("#testDiv").empty();
});

QUnit.test("test for setDashboard with TEQ low level", function(assert){
  var content = $('<h1 id="loggedInAccessLevel"></h2>' +
  '<button id="uploadDataBtn">Upload</button><button id="queryDataBtn">Query</button>' +
  '<button id="registerUserBtn">Register</button><button id="changeUserBtn">Change</button>');
  content.appendTo("#testDiv");
  setDashboard("TEQ_low_level");
  var expected = "You are logged in as a: TEQ Low Level";
  assert.equal($("#loggedInAccessLevel").text(), expected, "Passed!");
  assert.equal($("#queryDataBtn").is(':visible'), true, "Passed!");
  assert.equal($("#registerUserBtn").is(':visible'), false, "Passed!");
  assert.equal($("#changeUserBtn").is(':visible'), false, "Passed!");
  $("#testDiv").empty();
});

QUnit.test("test for setDashboard with TEQ mid level", function(assert){
  var content = $('<h1 id="loggedInAccessLevel"></h2>' +
  '<button id="uploadDataBtn">Upload</button><button id="queryDataBtn">Query</button>' +
  '<button id="registerUserBtn">Register</button><button id="changeUserBtn">Change</button>');
  content.appendTo("#testDiv");
  setDashboard("TEQ_mid_level");
  var expected = "You are logged in as a: TEQ Mid Level";
  assert.equal($("#loggedInAccessLevel").text(), expected, "Passed!");
  assert.equal($("#queryDataBtn").is(':visible'), true, "Passed!");
  assert.equal($("#registerUserBtn").is(':visible'), false, "Passed!");
  assert.equal($("#changeUserBtn").is(':visible'), false, "Passed!");
  $("#testDiv").empty();
});

QUnit.test("test for setDashboard with TEQ high level", function(assert){
  var content = $('<h1 id="loggedInAccessLevel"></h2>' +
  '<button id="uploadDataBtn">Upload</button><button id="queryDataBtn">Query</button>' +
  '<button id="registerUserBtn">Register</button><button id="changeUserBtn">Change</button>');
  content.appendTo("#testDiv");
  setDashboard("TEQ_high_level");
  var expected = "You are logged in as a: TEQ High Level";
  assert.equal($("#loggedInAccessLevel").text(), expected, "Passed!");
  assert.equal($("#queryDataBtn").is(':visible'), true, "Passed!");
  assert.equal($("#registerUserBtn").is(':visible'), true, "Passed!");
  assert.equal($("#changeUserBtn").is(':visible'), true, "Passed!");
  $("#testDiv").empty();
});

QUnit.test("test for setDashboard with UTSC Project Staff", function(assert){
  var content = $('<h1 id="loggedInAccessLevel"></h2>' +
  '<button id="uploadDataBtn">Upload</button><button id="queryDataBtn">Query</button>' +
  '<button id="registerUserBtn">Register</button><button id="changeUserBtn">Change</button>');
  content.appendTo("#testDiv");
  setDashboard("UTSC_staff");
  var expected = "You are logged in as a: UTSC Project Staff";
  assert.equal($("#loggedInAccessLevel").text(), expected, "Passed!");
  assert.equal($("#queryDataBtn").is(':visible'), true, "Passed!");
  assert.equal($("#registerUserBtn").is(':visible'), true, "Passed!");
  assert.equal($("#changeUserBtn").is(':visible'), true, "Passed!");
  $("#testDiv").empty();
});
