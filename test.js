const db = require('./amn-source');

db.update('chatRooms', { name: "hello" }, { $set: { roomName: "Mount View" } }, function (output) {
	console.log(output);
});
