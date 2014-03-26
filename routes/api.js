/*
 *  The API Package.
 *
 *  This package handles all API calls.
 *
 */

/*
 *  POST /api/saveData
 */

exports.saveData = function(req, res) {
  // Get the connection to the Mongo DB
  var db = req.app.settings.db;

  /* The data that has been posted to us is in a JS object called
   * body on the req object. So lets store it in the DB.
   */

   /* Get the collection called 'data' from the database. Remember a
    * collection is essentially an array of javascript objects (which
    * mongo calls documents). The first time we look for the collection 
    * called 'data' it won't be there so mongo will create it.
    */
   db.collection('data', function(err, collection) {
      /* Ok, we are now in the callback function so at this stage mongo
       * has found (or created) the collection called 'data'. The collection
       * is passed in as an argument to this callback function.
       *
       * Let's insert a document into the collection. The document (javascript
       * object) we want to insert in this particular instance is the object that
       * contains all the data that was posted to us by the browser/client. As
       * luck would have it, node.js has already created this object ... req.body
       *
       * So the first argument of the insert function is the document we want to
       * insert into the collection. The second argument, which is optional, tells
       * mongo to call a callback function when the insertion is complete. The third
       * argument (which is only there if the second argument is {w:1}) is the 
       * callback function that mongo is going to call.
       */

      collection.insert(req.body, {w:1}, function (err, result) {
        if (err) throw err;

        console.log("Result of insert: ", result);

        // Write back some JSON containing a status message
        res.send({status: "success"});
      });


    });
}

/*
 *  POST /api/saveData
 */
 exports.getData = function(req, res) {
  // Get the connection to the Mongo DB
  var db = req.app.settings.db;

  // Get the data collection
  db.collection('data', function(err, collection) {

    /*
     * The first think to note about the following line of code is that the find
     * method on a collection returns a cursor. A cursor is a pointer to the results
     * from a database query. If you execute a query on a database that returns 10 
     * rows, a cursor is returned that points to the first row of the 10 rows. The 
     * programmer can then use the cursor to get whatever row she wants, or to iterate
     * over all of them.
     *
     * So when you do a find on a collection you are returned a cursor to the results
     * which you then use to get rows from the result.
     *
     * The find method can take a variable number of arguments and returns a cursor.
     * The first argument to the find function is the query object, which in the example
     * below is empty - meaning we want everything, like * in sql. The second argument is
     * a an options objects that specifies various option. In the example below I fields
     * option which is an object containing the fields you want returned (which below is
     * the numbers field).
     *
     * As I said, the find() method returns a cursor object which I then call the sort 
     * method on. The sort method below takes in two arguments, the first is the field
     * in the document to sort on and the second is the direction to sort in. The sort 
     * method returns the cursor it is working on.
     *
     * The code below then calls the limit method on the cursor object that the sort method
     * returned. The limit method takes in two arguments, the first is the number of 
     * documents (rows) you want to limit the result to and the second is a callback
     * function that gets called when it is done. The callback function is passed and err
     * which will contain an error if one has occured and the cursor to the result (which 
     * in the code below whould be the number field of the document which has the largest
     * id). Since _id is actually a timestamp this would mean the most recent document.
     *
     * Within the callback function I call the nextObject method on the cursor object. The
     * cursor object points to only one document (row) because I limited the results to
     * only one. When I call the nextObject method I get the next document from the result.
     * The first time you call nextObject you get the first document. So when I call nextObject
     * below I get the first and only document from the result. This document is given to 
     * me via a callback. I send the document, via JSON, back to the caller.
     *
     * For detailed inforrmation see the mongodb native driver api at:
     *      http://mongodb.github.io/node-mongodb-native/contents.html
     */
    collection.find({}, {fields: {number: 1}}).sort('_id','desc').limit(1, function(err, cursor){
      cursor.nextObject(function(err, doc) {
        if (err) {throw err};
        
        console.log("/api/getData - returning: ", JSON.stringify(doc));
        res.send(doc);
      });
    });

    
  });

 };