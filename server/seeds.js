Meteor.startup(function () {
	Meteor.onConnection(function(conn) {
		// console.log("Client IP: "+conn.clientAddress);
		SendIP(conn.clientAddress);
	});
});
