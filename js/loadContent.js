var sheetsuUrl = 'https://sheetsu.com/apis/v1.0/34811115b8f7';

// Load API
$.ajax({
	url: sheetsuUrl,
	dataType: 'json',
	type: 'GET',

	// place for handling successful response
	success: function(data) {
		addServers(data);
	},

	// handling error response
	error: function(data) {
		console.log(data);
	}
});

// Add rows to server-table
addServers = function(servers) {
	var table = $('#server-table');
	for(var i=0; i<servers.length; i+=1) {
		server = servers[i];
		html = '<tr><td>' + server.hostname + '</td>';
		html += '<td>' + server.status + '</td>';
		html += '<td>' + server.build + '</td>';
		html += '<td>' + server.os + '</td>';
		html += '<td>' + server.licenses + '</td></tr></tbody>';
		table.append(html);
	}
};