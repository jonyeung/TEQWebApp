var selectedFilters = [];
$(document).ready(function (){
	if(sessionStorage.userLevel == "TEQ_low_level") {
		$("main *").hide();
		$(".lowUser").show();
		$(".lowUser").children().show();
	}

	loadFilterButtons();
	var localAgencyData = agencyData;
	var columnNameData = Object.keys(localAgencyData);

	applySavedQueries();

	$("button[class=filterOptions]").on("click", function(event){
		$("ol#selectable").empty();
		var id = event.target.id;
		var char = id.charAt(id.length - 1);
		var row = "";
		for(var i = 0; i < columnNameData.length; i++){
			if(columnNameData[i].charAt(0).toUpperCase() == char){
				row += '<li><button class="colomnNamesList" id=' + localAgencyData[columnNameData[i]]+
				'>' + columnNameData[i] + '</button></li>';
			}
		}
		$("ol#selectable").append(row);
	});

    $(function() {
	    $( "#queryInput" ).autocomplete({
	       source: columnNameData
	    });
 	});

 	$("button#addFilterButton").on("click", function(event){
 		var searchContent = $("input#queryInput").val();
 		if($.inArray(searchContent, columnNameData) != -1){
 			if($.inArray(searchContent,selectedFilters) == -1){
 				selectedFilters.push(searchContent);
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

	$("button#applyFilterButton").on("click", function(){
		if(selectedFilters.length == 0){
			alert("Please select more than one filter.");
			return;
		}
		var data = [];
		for (var i = 0;i< selectedFilters.length;i++){
			data[i] = localAgencyData[selectedFilters[i]];
		}
		console.log(data);
		data = {columns:data}
		$.ajax({
			type:"GET",
			url:"http://localhost:8080/getColumns",
			data: $.param(data),
			dataType:"json",
			traditional:true,
			error: function(){
				alert("Error getting column data.");
			},
			success:function(data,status){
				if(data.success){
					generateColomns(data.result.data, localAgencyData);
				}else{
					alert("Cannot apply filter.");
				}
			}
		})

	})

	$('#savedQuerySelect').change(function() {
		const query = JSON.parse(this.value)
		updateSelectedFilters(query)
	})

})

// function that populates filters when user clicks on a letter
function loadFilterButtons(){
	var alphabet = 'ABCDEFGHILMNOPRSTUWY';
	var buttons = '';
	for (var i = 0; i < alphabet.length; i++) {
		id = "filter" + alphabet.charAt(i);
  		buttons += '<button class="filterOptions" id='+id+'>'+ alphabet.charAt(i)+'</button>';
	}
	$("div#filterByLetter").append(buttons);
}

// function that update the list of selected filters after user clicks on a filter
function updateSelectedFilters(filters){
	var buttons = '';
	$("div#selectedFilters").empty();
	for(var i = 0; i < filters.length; i++){
		buttons += '<button class="selectedFilters">' + filters[i] + '</button>';
	}
	$("div#selectedFilters").append(buttons);
	selectedFilters = filters
}

// function that generates a table from returned data
function generateColomns(data, localAgencyData){
	$("ol#selectable").empty();
	$("div#generatedTable").empty();
	// generate headers
	var table = '<table id="dataList"><tr>';
	for(let[key,value] of Object.entries(data[0])){
		table += '<th>' + getKeyByValue(localAgencyData,key) + '</th>'
	}
	table += '</tr>';

	for(var i = 0;i< data.length; i++){
		table += '<tr>';
		for(let[key,value] of Object.entries(data[i])){
			if(value == null){
				value = 'N/A';
			}else if (value['type'] == "Buffer"){
				value = value['data'] == 1 ? 'Yes' : 'No';
			}
			table += '<th>' + value + '</th>';
		}
		table += '</tr>';
	}
	table += '</table>';

	$("div#generatedTable").append(table);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function applySavedQueries() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/getPresetQueries',
		error: function() {
			alert('Error occured during data retrieval.')
		},
		success: function(data, status) {
			if (data.success) {
				const queries = data.result
				for (let [name, query] of Object.entries(queries)) {
					const serializedQuery = JSON.stringify(query)
					$('#savedQuerySelect').append($('<option>', {value:serializedQuery, text:name}));
				}
			} else {
				alert('Cannot get preset queries.')
			}
		}
	})
}
