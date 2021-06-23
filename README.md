# NOT FOR PRODUCTION

## anu-mongo-node
[For learning purpose only] - Library for mongoDB operations supported in nodejs. 

I created this small library when I was learning mongodb with node.js. It supports very basic fetures and doesn't support aggregate.

______________
### Features usage
1. **`insert`**: 
        
    **Description**: To insert data in collection.
       
    **Arguments**: collection_name, payload_to_insert, callback_function
        
    **Usage**:

```
    const db = require('./amn-source');

    db.insert(
        'chatRooms',                    // collection_name
        { name: "hello" },              // payload_to_insert
        function (output) {             // callback_function
            console.log(output);
        }
    );

```

2. **`update`**: 
        
    **Description**: To update data in doucment.
       
    **Arguments**: collection_name, condition, payload_to_update, callback_function
        
    **Usage**:

```
    const db = require('./amn-source');

    db.update(
        'chatRooms',                    // collection_name
        { name: "hello" },              // condition
        {                               // payload_to_update
            $set: { 
                roomName: "Mount View" 
            } 
        }
        function (output) {             // callback_function
            console.log(output);
        }
    );

```

3. **`delete`**: 
        
    **Description**: To delete data in collection.
       
    **Arguments**: collection_name, payload_to_delete, callback_function
        
    **Usage**:

```
    const db = require('./amn-source');

    db.delete(
        'chatRooms',                    // collection_name
        { name: "hello" },              // payload_to_delete
        function (output) {             // callback_function
            console.log(output);
        }
    );

```

4. **`fetch`**: 
        
    **Description**: To fetch data from mongoDB.
       
    **Arguments**: collection_name, condition, callback_function
        
    **Usage**:

```
    const db = require('./amn-source');

    db.fetch(
        'chatRooms',                    // collection_name
        { },                            // condition -> can be empty
        function (output) {             // callback_function
            console.log(output);
        }
    );

```

5. **`ifExists`**: 
        
    **Description**: To check if data is already present in collection.
       
    **Arguments**: collection_name, payload_to_check, callback_function
        
    **Usage**:

```
    const db = require('./amn-source');

    db.ifExists(
        'chatRooms',                    // collection_name
        { name: "hello" },              // payload_to_check
        function (output) {             // callback_function
            console.log(output);
        }
    );

```

6. **`oid`**: 
        
    **Description**: To create ObjectID from valid ObjectId string.
       
    **Arguments**: ObjectId_string
        
    **Usage**:

```
    const db = require('./amn-source');

    const ObjectID = db.oid("<Valid ObjectID String>");

    console.log(ObjectId); // ObjectId("507f1f77bcf86cd799439011")

```

_____________

