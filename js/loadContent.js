var sheetsuUrl = 'https://sheetsu.com/apis/v1.0/f3b37b87d6ec';

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
		html += '<td>' + fullBuild(server.build) + '</td>';
		html += '<td>' + getOS(server.os) + '</td>';
		html += '<td>' + server.licenses + '</td></tr>';
		table.append(html);
	}
};

addClicks = function() {
	// Add alerts
	$(".status-button").click(function(){
		var domObj = $(this);
		var buttonElement = domObj.get(0);
		var status = changeStatus(buttonElement.id, domObj.val())
		domObj.val(status);
		buttonElement.innerHTML = "Server Status: " + status;
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
		url: sheetsuUrl + '/hostname/' + hostname,
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

	return status;
};

fullBuild = function(build) {
	if (build === "Q2") {
		return "2016 Q2 Release"
	}
	else if (build === "Q4") {
		return "Q4 - 2015 October Release"
	} 
	else if (build === "Oct14") {
		return "2014 October Release"
	}
	else if (build === "Apr14") {
		return "2014 April Release"
	}
	else if (build.indexOf("SP") > -1) {
		return 'Service Pack: ' + build.substring(2)
	}
	else {
		return build
	}
}

getOS = function(os) {
	if (os === "U") {
		return "Red Hat Linux"
	}
	else {
		return "Windows Server"
	}
}