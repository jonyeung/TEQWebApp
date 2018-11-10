QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
  });


QUnit.test( "test for updateSelectedFilters", function( assert ) {
    var filters = ['filter1', 'filter2']
    var newdiv = $('<div id="selectedFilters"></div>')
    $("#selectedFilters").css("display","none");
    newdiv.appendTo('body');
    updateSelectedFilters(filters);
    
    assert.equal($("#selectedFilters").text(), 
    filters[0] + filters[1], "Passed!" )
});