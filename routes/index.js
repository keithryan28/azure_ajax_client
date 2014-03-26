
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Ajax Client/Server' });
};



/*
 * GET /getData
 */
exports.getData = function (req, res) {
  res.render('getData');
};

/*
 * GET /getDataBlock
 */
 exports.getDataBlock = function (req, res) {
 	// Get the connection to the database
 	var db = req.app.settings.db;

 	// Get the data collection
 	db.collection('data', function (err, theDataCollection) {
 		if (err) {
 			// ok something has gone wrong, kets throw and exception. We really
 			// need to handling these errors better.
 			throw err;
 		}

 		/*
 		 *	Get the number field of the 10 latest documents whose owner field
 		 *	is "John". Call the toArray method of the cursor object to convert
 		 *	the resultset to an array - be carefull doing this for very large
 		 *	results as you may run into memory issues.
 		 */
 		theDataCollection.find({owner: "John"}, {fields: {number: 1}})
 			.sort('_id','desc')
 			.limit(10)
 			.toArray(function(err, resultsArray) {
 				if (err) {throw err};

 				res.render('getDataBlock', {data: resultsArray});
 			});

 	});

 };


exports.getDataBlockChart = function (req, res) {
	/*
	 * Ok, the user is looking for a chart which we are going to give them via
	 * HighCharts. This function is almost identical to the function
	 * getDataBlock but with the exception it renders a different page. I am 
	 * going to leave it like this for simplicity but really it should be improved.
	 */

	 // Get the connection to the database
 	var db = req.app.settings.db;

 	// Get the data collection
 	db.collection('data', function (err, theDataCollection) {
 		if (err) {
 			// ok something has gone wrong, kets throw and exception. We really
 			// need to handling these errors better.
 			throw err;
 		}

 		/*
 		 *	Get the number field of the 10 latest documents whose owner field
 		 *	is "John". Call the toArray method of the cursor object to convert
 		 *	the resultset to an array - be carefull doing this for very large
 		 *	results as you may run into memory issues.
 		 */
 		theDataCollection.find({owner: "John"}, {fields: {number: 1}})
 			.sort('_id','desc')
 			.limit(10)
 			.toArray(function(err, resultsArray) {
 				if (err) {throw err};

 				res.render('getDataBlockChart', {dataFromDB: resultsArray});
 			});

 	});
};

