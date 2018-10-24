/**
 * Created On October 24, 2018
 *
 * Description: This is source file for loading library. It contains driver, connection
 * and method to drive operation on mongoDB. 
 *
 * MIT License
 */

// ------ Reserved -------
var CONNECTION; 

// ------ Settings -------
var URL = "mongodb://localhost:27017/"; // Enter mongodb url and port here.
var DATABASE = 'myDB'; // Enter Database name here.

/**
 * Creating Connection
 * MongoDB Driver 'mongodb'
 */

try{
	var mongo = require('mongodb').MongoClient; 
	emit('MongoDB client initiated successfully.');	
}
catch(err){
	emit("You don't have installed MongoDB driver for Node Js.");
	emit("Please run this command in console: npm install mongodb --save");	
}

/**
 * Description: To connect mongodb instance and proceed with given action.
 * @method anu_mongo_exec
 * 
 */

function anu_mongo_exec(action,payload,condition){	
	mongo.connect(URL, { useNewUrlParser: true }, function(err, db){
		var dbo = db.db(DATABASE);
		switch(action){
			case 'insertOne':				
			break;

			case 'insert':
			break;
		}
	});			
}


/**
 * Description: To insert data in mongoDB.
 * @method insert
 * @param collection, payload
 *
 * @return console output
 */

function insert(collection, payload){
	var count = Object.keys(payload).length;
	if(count == 1){
		anu_mongo_exec('insertOne', payload, null);
	}
	else{
		anu_mongo_exec('insert', payload, null);	
	}
	
}


/**
 * Description: To print messages in console.
 * @method emit
 * @param msg
 *
 * @return console output
 */

function emit(msg){
	console.log(msg);
}

insert('chatRooms', 
	[
		{
			name : 'lele',
			roomName : 'roomelee'
		}
	]
);