/**
 * Created On October 24, 2018
 *
 * Description: Contains mongoDB CRUD functions. It contains driver, connection
 * and method to drive operation on mongoDB (for learning purpose only).
 *  
 * Git Link: https://github.com/officialanurag/anu-mongo-node/
 * 
 * **NOT RECOMMENDED FOR PRODUCTION**
 */

// ------ Settings -------
var URL = "mongodb://localhost:27017/"; // Enter mongodb url and port here.
var DATABASE = 'myDB'; // Enter Database name here.

/**
 * Creating Connection
 * MongoDB Driver 'mongodb'
 */

try {
	var mongo = require('mongodb').MongoClient;
	var ObjectID = require('mongodb').ObjectID;
	emit('MongoDB client initiated successfully.');
}
catch (err) {
	emit("You don't have installed MongoDB driver for Node Js.");
	emit("Please run this command in console: npm install mongodb --save");
}

/**
 * Description: To connect mongodb instance and proceed with given action.
 * @method anu_mongo_exec
 * 
 */

function anu_mongo_exec(action, dataObject, condition, callback) {
	mongo.connect(URL, { useNewUrlParser: true }, function (err, db) {
		var dbo = db.db(DATABASE);
		switch (action) {
			case 'insertOne':
				dbo.collection(dataObject.collection).insertOne((dataObject.payload)[0], function (err, res) {
					if (err) throw err;
					emit('Query Result: ' + res.result);
					emit('Inserted Documents: ' + res.insertedCount);
					callback(res.ops);
					db.close();
				});
				break;

			case 'insert':
				dbo.collection(dataObject.collection).insertMany(dataObject.payload, function (err, res) {
					if (err) throw err;
					emit('Query Result: ' + JSON.stringify(res.result));
					emit('Inserted Documents: ' + res.insertedCount);
					callback(res.ops);
					db.close();
				});
				break;

			case 'delete':
				dbo.collection(dataObject.collection).deleteMany(dataObject.payload, function (err, res) {
					if (err) throw err;
					emit(res.result.n + " document(s) deleted");
					db.close();
				});
				break;

			case 'update':
				dbo.collection(dataObject.collection).updateOne(condition, { $set: dataObject.payload }, function (err, res) {
					if (err) throw err;
					emit(res.result.nModified + " document(s) updated");
					callback(res.result);
					db.close();
				});
				break;

			case 'fetch':
				dbo.collection(dataObject.collection).find(dataObject.payload).toArray(function (err, res) {
					if (err) throw err;
					callback(res);
					db.close();
				});
				break;
		}
	});
}

module.exports = {
	/**
	 * Description: To insert data in collection.
	 * @method insert
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	insert: function (collection, payload, callback) {
		var count = Object.keys(payload).length;

		var PAYLOAD = {
			'collection': collection,
			'payload': payload
		};

		if (count == 1) {
			anu_mongo_exec('insertOne', PAYLOAD, null, function (output) {
				callback(output);
			});
		}
		else {
			anu_mongo_exec('insert', PAYLOAD, null, function (output) {
				callback(output);
			});
		}
	},

	/**
	 * Description: To update data in doucment.
	 * @method update
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	update: function (collection, condition, payload, callback) {
		var PAYLOAD = {
			'collection': collection,
			'payload': payload
		};
		anu_mongo_exec('update', PAYLOAD, condition, function (output) {
			callback(output);
		});
	},

	/**
	 * Description: To delete data in collection.
	 * @method delete
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	delete: function (collection, payload, callback) {
		var PAYLOAD = {
			'collection': collection,
			'payload': payload
		};
		anu_mongo_exec('delete', PAYLOAD, null, function (output) {
			callback(output);
		});
	},

	/**
	 * Description: To fetch data from mongoDB.
	 * @method fetch
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	fetch: function (collection, payload, callback) {
		var PAYLOAD = {
			'collection': collection,
			'payload': payload
		};
		anu_mongo_exec('fetch', PAYLOAD, null, function (output) {
			callback(output);
		});
	},

	/**
	 * Description: To check if data is already present in collection.
	 * @method ifExists
	 * @param collection, payload, callback function
	 *
	 * @return console output, callback function
	 */

	ifExists: function (collection, payload, callback) {
		var PAYLOAD = {
			'collection': collection,
			'payload': { $or: payload }
		};
		anu_mongo_exec('fetch', PAYLOAD, null, function (output) {
			callback(output.length >= 1 ? true : false);
		});
	},

	/**
	 * ObjectID for _id field
	 */

	oid: function (value) {
		return ObjectID(value);
	}
}




/**
 * Description: To print messages in console.
 * @method emit
 * @param msg
 *
 * @return console output
 */

function emit(msg) {
	console.log(msg);
}
