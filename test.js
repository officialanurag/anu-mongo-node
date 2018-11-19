var db = require('./amn-source');

/*db.insert('chatRooms', 
	[
		{
			name : 'lele',
			roomName : 'roomelee'
		}
	],
	function(output){
		console.log(output);
	}
);
*/

/*db.delete('chatRooms', {_id : db.oid("5bf2842073e8cd27b88162fc")}, function(output){
		console.log(output);
});*/

/*console.log(db._id("5bf26ef763deee04b4534783"));*/

db.update('chatRooms',{name:"hello"},{ $set : {roomName:"oyelele"}}, function(output) {
	console.log(output);
});
