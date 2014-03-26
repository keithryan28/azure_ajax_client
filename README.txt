How to set up the MongoDB
-------------------------

1.  Create a folder called data in the app directory, this where we are going to get the 
    Mongo server (mongod) to store its data

2.  Start the Mongo server and set the dbpath (the database path) for it to use. Assuming the
    app directory is C:\node-projects\11-AjaxClientServer, then we would enter the following
    in a dos prompt

      mongod --dbpath C:\node-projects\11-AjaxClientServer\data

3.  Now the the Mongo server is up and running, use the mongo cli (command line interface) to
    create a database called AjaxData. Open up another dos prompt and enter

      mongo
      >use AjaxData

