QUnit.test("test for loadFilterButtons", function(assert){
    var expected = 'ABCDEFGHILMNOPRSTUWY';
    $('<div id="filterByLetter"></div>').appendTo('body');
    loadFilterButtons();
    $('#filterByLetter').css('display','none');
    assert.equal($("#filterByLetter").text(),
    expected, "Passed!" )
});

QUnit.test( "test for updateSelectedFilters", function( assert ) {
    var filters = ['filter1', 'filter2']
    var expected = "<button class=\"selectedFilters\">filter1</button>"+
    "<button class=\"selectedFilters\">filter2</button>";
    var newdiv = $('<div id="selectedFilters"></div>')
    newdiv.appendTo('body');
    updateSelectedFilters(filters);
    $("#selectedFilters").css("display","none");
    assert.equal($("#selectedFilters").html(),
    expected, "Passed!" )
});

QUnit.test("test for getKeyByValue", function(assert){
    var obj = {"alice":"apple","bob":"banana"};
    var expected = "bob";
    assert.equal(getKeyByValue(obj,"banana"), expected, "Passed!");
    assert.equal(getKeyByValue(obj,"pear"), undefined, "Passed!");
});

QUnit.test("test for generateColumns", function(assert){
    var data = [{"processing_details":"details1", "phone_no":"phone1"},
    {"processing_details":"details2", "phone_no":"phone2"}];
    var expected = "Processing DetailsPhone NumberDelete Rowdetails1phone1details2phone2";
    var newdiv = $('<div id="generatedTable"></div>');

    newdiv.appendTo('body');
    generateColumns(data,agencyData);
    $("#generatedTable").css("display","none");
    assert.equal($('#generatedTable').text(),
    expected,"Passed!");
});
