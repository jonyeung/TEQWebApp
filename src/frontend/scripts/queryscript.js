$(document).ready(function (){
	loadFilterButtons();
	var localAgencyData = agencyData;
	var colomnNameData = Object.keys(localAgencyData);
	var selectedFilters = [];

	$("button[class=filterOptions]").on("click", function(event){
		$("ol#selectable").empty();
		var id = event.target.id;
		var char = id.charAt(id.length - 1);
		var row = "";
		for(var i = 0; i < colomnNameData.length; i++){
			if(colomnNameData[i].charAt(0).toUpperCase() == char){
				row += '<li><button class="colomnNamesList" id=' + localAgencyData[colomnNameData[i]]+
				'>' + colomnNameData[i] + '</button></li>';
			}
		}
		$("ol#selectable").append(row);
	});

    $(function() {
	    $( "#queryInput" ).autocomplete({
	       source: colomnNameData
	    });
 	});

 	$("button#addFilterButton").on("click", function(event){
 		var searchContent = $("input#queryInput").val();
 		if($.inArray(searchContent, colomnNameData) != -1){
 			if($.inArray(searchContent,selectedFilters) == -1){
 				selectedFilters.push(searchContent);
 				console.log(selectedFilters);
 				updateSelectedFilters(selectedFilters);
 			}
 		}
 	});

	$("button#clearFilterButton").on("click",function(event){
		selectedFilters = [];
		updateSelectedFilters(selectedFilters);
	});

	$('ol#selectable').on("click", "button.colomnNamesList",function(event){
		var selected = event.target;
		if($.inArray($(selected).text(), selectedFilters) == -1){
			selectedFilters.push($(selected).text());
			updateSelectedFilters(selectedFilters);
		}
	});

	$("button#savePopupButton").on("click", function() {
		$("div#saveQueryPopup").css("display", "block");
	});

	$("#closePopup").on("click", function() {
		$("div#saveQueryPopup").css("display", "none");
	});

	$("button#cancelSaveButton").on("click", function() {
		$("div#saveQueryPopup").css("display", "none");
	});
})

function loadFilterButtons(){
	var alphabet = 'ABCDEFGHILMNOPRSTUWY';
	var buttons = '';
	for (var i = 0; i < alphabet.length; i++) {
		id = "filter" + alphabet.charAt(i);
  		buttons += '<button class="filterOptions" id='+id+'>'+ alphabet.charAt(i)+'</button>';
	}
	$("div#filterByLetter").append(buttons);
}

function updateSelectedFilters(filters){
	var buttons = '';
	$("div#selectedFilters").empty();
	for(var i = 0; i < filters.length; i++){
		buttons += '<button class="selectedFilters">' + filters[i] + '</button>';
	}
	$("div#selectedFilters").append(buttons);
}
