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

	$("button#saveQueryButton").on("click", function() {
		$("div#saveQueryPopup").css("display", "none");
	});

	$("button#applyFilterButton").on("click", function(){
		var data = filterDataSetup(localAgencyData);
		// do nothing if filter was empty
		if (data == null) {
			return;
		} else {
			data = {columns:data};
			$.ajax({
				type:"GET",
				url:"https://c01.mechanus.io/getColumns",
				data: $.param(data),
				dataType:"json",
				traditional:true,
				error: function(){
					alert("Error getting column data.");
				},
				success:function(data,status){
					if(data.success){
						generateColumns(data.result.data, localAgencyData);
					}else{
						alert("Cannot apply filter.");
					}
				}
			})
		}
	})

	$('#savedQuerySelect').change(function() {
		const query = JSON.parse(this.value)
		updateSelectedFilters(query)
	})

	$("button#exportToCSVButton").on("click", function(){
		var data = filterDataSetup(localAgencyData);
		var csv = null;
		// do nothing if filter was empty
		if (data == null) {
			return;
		} else {
			data = {columns:data};
			$.ajax({
				type:"GET",
				url:"https://c01.mechanus.io/getColumns",
				data: $.param(data),
				dataType:"json",
				traditional:true,
				error: function(){
					alert("Error getting column data.");
				},
				success:function(data,status){
					if(data.success){
						// convert to csv and download
						csv = objToCsv(data.result.data);
						downloadCSVFile(csv);
					}else{
						alert("Cannot export to csv.");
					}
				}
			})
		}
	})
})

// function to setup apply filters/export data to csv
function filterDataSetup(localAgencyData){
	if(selectedFilters.length == 0){
		alert("Please select at least 1 filter.");
		return null;
	}
	var data = [];
	for (var i = 0;i< selectedFilters.length;i++){
		if (i == 0) {
			data[i] = "update_record_id";
		}
		data[i+1] = localAgencyData[selectedFilters[i]];
	}

	return data;
}

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
function generateColumns(data, localAgencyData){
	$("ol#selectable").empty();
	$("div#generatedTable").empty();
	// generate headers
	var table = '<table id="dataList"><tr>';
	for(let[key,value] of Object.entries(data[0])){
		table += '<th>' + getKeyByValue(localAgencyData,key) + '</th>'
	}
	table += '<th style="background-color:red">Delete Row</th>';
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
		const id = data[i].update_record_id
		table += `<th><button id="DeleteRowButton" value="${id}" class="fa fa-close"</button></th>`;
		table += '</tr>';
	}
	table += '</table>';
	table_dom = $(table)

	table_dom.on("click", "button", function() {
		const id = $(this).val()
		$.ajax({
			type: "DELETE",
			url: "https://c01.mechanus.io/row",
			data: { id },
			error: function() {
				alert("Error occured during deletion.")
			},
			success: function(data, status) {
				if (data.success) {
					alert(`Row ${id} successfully deleted`)
				}
			}
		})
	})

	$("div#generatedTable").append(table_dom);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function applySavedQueries() {
	$.ajax({
		type: 'GET',
		url: 'https://c01.mechanus.io/getPresetQueries',
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

function objToCsv(obj){
	var csv = "";
	if(obj.length > 0){
		var header = Object.keys(obj[0]);
		for(var i = 0; i < header.length; i++){
			csv += getKeyByValue(agencyData,header[i]);
			if(i < header.length - 1){
				csv += ",";
			}
		}
		csv += "\n";
		for(var j = 0; j < obj.length; j++){
			var values = Object.values(obj[j]);
			for (var k = 0; k < values.length;k++){
				if(values[k] == null){
					csv += 'N/A';
				}else if (values[k]['type'] == "Buffer"){
					csv += values[k] == 1 ? 'Yes' : 'No';
				}else{
					csv += values[k].replace(/,/g, ' ');
				}
				if(k < values.length - 1){
					csv += ",";
				}
			}
			csv += "\n";
		}
		return csv;
	}else{
		return null;
	}

}

// function to download the csv file
function downloadCSVFile(csv) {
	var data, filename, link;
	if (csv == null) {
		return;
	}
	filename = 'report.csv';

	var blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});
	if (navigator.msSaveBlob)
	{ // IE 10+
		navigator.msSaveBlob(blob, filename)
	}
	else
	{
		var link = document.createElement("a");
		if (link.download !== undefined)
		{
			// feature detection, Browsers that support HTML5 download attribute
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style = "visibility:hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}
