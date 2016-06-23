var sheetsuUrl = 'https://sheetsu.com/apis/v1.0/34811115b8f7';

// Load API
$.ajax({
	url: sheetsuUrl,
	dataType: 'json',
	type: 'GET',

	// place for handling successful response
	success: function(data) {
		addServers(data);
		addClicks();
	},

	// handling error response
	error: function(data) {
		console.log(data);
	}
});

// Add rows to server-table
addServers = function(servers) {
	var table = $('#server-table');

	// Loop through records and append HTML
	for(var i=0; i<servers.length; i+=1) {
		server = servers[i];
		html = '<tr><td>' + server.hostname + '.pd.local' + '</td>';
		button = '<button class="status-button" value="' + server.status + '" id="' + server.hostname + '">Server Status: ' + server.status + '</button>'
		html += '<td>' + button + '</td>';
		html += '<td>' + server.build + '</td>';
		html += '<td>' + server.os + '</td>';
		html += '<td>' + server.licenses + '</td></tr></tbody>';
		table.append(html);
	}
};

addClicks = function() {
	// Add alerts
	$(".status-button").click(function(){
		var domObj = $(this);
		var buttonElement = domObj.get(0);
		changeStatus(buttonElement.id, domObj.val())
	});
};

changeStatus = function(hostname, status) {
	if (status === "Up") {
		status = "Down";
	}
	else {
		status = "Up";
	}

	var data = {
		hostname: hostname,
		licenses:"LE,CE,CM,OA",
		build:"Q2",
		os:"U",
		patch:"",
		status: status,
		notes:""};

	$.ajax({
		url: 'https://sheetsu.com/apis/v1.0/34811115b8f7/hostname/' + hostname,
		data: data,
		dataType: 'json',
		type: 'PUT',

		// handle successful response
		success: function(data) {
			console.log(data);
		}, 

		// handle error response
		error: function(data) {
			console.log(data);
		}
	});
};