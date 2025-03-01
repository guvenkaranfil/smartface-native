/**
 * @class Data.Database
 * @since 1.0
 * @see https://hiddentao.com/squel/
 * @see https://sqlite.org/docs.html
 *
 * Database is query friendly persisted data interface for perfoming database operations using SQLite. You can open database 
 * from assets or create/open database from file system. Also you can create in-memory database too. 
 * We recommend to use Squel.js library for creating SQL Queries.
 * 
 * 
 *     @example
 *     const File = require("@smartface/native/io/file");
 *     const Database = require('@smartface/native/data').Database;
 *     
 *     var database = new Database({
 *         file: new File({path: 'assets://database.sqlite'})
 *     });
 *     
 *     // Creating person table
 *     database.execute("CREATE TABLE 'person' ( 'id' INTEGER, 'name' TEXT DEFAULT 'Smartface', 'age' INTEGER DEFAULT 5, 'isWorker' INTEGER DEFAULT 0, 'rate' REAL DEFAULT 2.5, PRIMARY KEY('id') )");
 *     
 *     // Inserting values into person
 *     database.execute("INSERT INTO person (name, age, isWorker, rate) VALUES ('George', 47, 0, 1.2)");
 *     database.execute("INSERT INTO person (name, age, isWorker, rate) VALUES ('James', 40, 1, 3.4)");
 *     database.execute("INSERT INTO person (name, age, isWorker, rate) VALUES ('Alex', 25, 1, 1.7)");
 *     
 *     // Getting workers count
 *     var queryResult = database.query("SELECT * FROM person WHERE(isWorker = 1)");
 *     console.log("Worker count is: " + queryResult.count());
 *
 */
function Database(params) {}

/**
 * The file for creating/opening database from it. If the given file is Assets, the database will be open but if assets not exists the exception will thrown. 
 * The parameter will setted if only given in constructor.
 *
 * @property {IO.File} file
 * @readonly
 * @android
 * @ios
 * @throws {Error}
 * @since 1.0
 */
Database.prototype.file;

/**
 * A boolean value that represents database object is in-memory or not. In-memory databases are a way faster than normal databases 
 * but in-memory databases are temporary, you can not save them into a file. When database closes or application stopped, database 
 * will be destroyed.
 * The parameter will setted if only given in constructor.
 * 
 * @property {Boolean} inMemory
 * @readonly
 * @android
 * @ios
 * @throws {Error}
 * @see https://sqlite.org/inmemorydb.html
 * @see https://en.wikipedia.org/wiki/In-memory_database
 * @since 1.0
 */
Database.prototype.inMemory;

/**
 * Close the database. You should close the database after you done your job. 
 * If you don't, you will not open the database until close and will throw exception if you want to reopen it.
 * 
 * @method close
 * @android
 * @ios
 * @throws {Error}
 * @since 1.0
 */
Database.prototype.close = function() {};

/**
 * Execute Non SELECT SQL Command on Database. Method will thrown exception when execution failed.
 * 
 * @param {String} sqlCommand
 * @method execute
 * @android
 * @ios
 * @throws {Error}
 * @see https://sqlite.org/lang.html
 * @since 1.0
 */
Database.prototype.execute = function(sqlCommand) {};

/**
 * Execute SELECT SQL Command on Database. Method will thrown exception when execution failed.
 * 
 * @param {String} sqlCommand
 * @return {Data.Database.QueryResult}
 * @method query
 * @android
 * @ios
 * @throws {Error}
 * @see https://sqlite.org/lang.html
 * @since 1.0
 */
Database.prototype.query = function(sqlCommand) {};


/**
 * @class Data.Database.QueryResult
 * @since 1.0
 *
 * An interface for collection of result of the Query. 
 * You can not create instance from QueryResult, you should use {@link Data.Database#query Database.query}. 
 * 
 *     @example
 *     // Assuming Database and person table already created
 *     var rateGrater3Names = [];
 *     // Getting people who has rate grater than 3.
 *     var rateGrater3Result = database.query("SELECT * FROM person WHERE(rate > 3)");
 *     for(var i = 0; i < rateGrater3Result.count() ; i++){
 *         // Getting person name
 *         rateGrater3Names.push( rateGrater3Result.get(i).getString('name') );
 *     }
 */
Database.QueryResult = function(params) {}

/**
 * Returns the count of the query result.
 * 
 * @method count
 * @return {Number}
 * @android
 * @ios
 * @since 1.0
 */
Database.QueryResult.prototype.count = function() {};

/**
 * Returns first match from Query. If no result match with Query, will return null.
 * 
 * @method getFirst
 * @return {Data.Database.DatabaseObject}
 * @android
 * @ios
 * @since 1.0
 */
Database.QueryResult.prototype.getFirst = function() {};

/**
 * Returns last match from Query. If no result match with Query, will return null.
 * 
 * @method getLast
 * @return {Data.Database.DatabaseObject}
 * @android
 * @ios
 * @since 1.0
 */
Database.QueryResult.prototype.getLast = function() {};

/**
 * Returns the element at the specified index in this query result. If index greater than count, it will throw exception
 * 
 * @method get
 * @param {Number} index
 * @return {Data.Database.DatabaseObject}
 * @android
 * @ios
 * @throws {Error} 
 * @since 1.0
 */
Database.QueryResult.prototype.get = function(index) {};


/**
 * Closes the QueryResult, releasing all of its resources and making it completely invalid.
 * 
 * @method close
 * @android
 * @since 4.0.2
 */
Database.QueryResult.prototype.close = function() {};

/**
 * @class Data.Database.DatabaseObject
 * @since 1.0
 *
 * The one object from database. You can not create instance 
 * from DatabaseObject, you should use {@link Data.Database.QueryResult#getFirst QueryResult.getFirst}, 
 * {@link Data.Database.QueryResult#getLast QueryResult.getLast} or {@link Data.Database.QueryResult#get QueryResult.get},
 * 
 *     @example
 *     // Assuming Database and person table already created
 *     var selectedPeople = [];
 *     // Getting people who older than 15 years old and name begins with A.
 *     var selectedPeopleQueryResult = database.query("SELECT * FROM person WHERE(age > 25 AND name LIKE 'A%')");
 *     for(var i = 0; i < selectedPeopleQueryResult.count() ; i++){
 *         // Getting person
 *         var selectedPerson = selectedPeopleQueryResult.get(i);
 *         selectedPeople.push( {
 *             name: selectedPerson.getString('name'),
 *             age: selectedPerson.getInteger('age'),
 *             isWorker: selectedPerson.getInteger('isWorker'),
 *             rate: selectedPerson.getFloat('rate'),
 *         } );
 *     }
 */
Database.DatabaseObject = function(params) {};

/**
 * Returns given column name with String. If the given column is not String will thrown exception.
 * 
 * @method getString
 * @param {String} columnName
 * @return {String}
 * @android
 * @ios
 * @throws {Error}
 * @since 1.0
 */
Database.DatabaseObject.prototype.getString = function(columnName) {};

/**
 * Returns given column name with Integer. If the given column is not Integer will thrown exception.
 * 
 * @method getInteger
 * @param {String} columnName
 * @return {Number}
 * @android
 * @ios
 * @throws {Error}
 * @since 1.0
 */
Database.DatabaseObject.prototype.getInteger = function(columnName) {};

/**
 * Returns given column name with Boolean. If the given column is not Boolean will thrown exception.
 * 
 * @method getBoolean
 * @param {String} columnName
 * @return {Boolean}
 * @android
 * @ios
 * @throws {Error}
 * @since 1.0
 */
Database.DatabaseObject.prototype.getBoolean = function(columnName) {};

/**
 * Returns given column name with Float. If the given column is not Float will thrown exception.
 * 
 * @method getFloat
 * @param {String} columnName
 * @return {Number}
 * @android
 * @ios
 * @throws {Error}
 * @since 1.0
 */
Database.DatabaseObject.prototype.getFloat = function(columnName) {};

module.exports = Database;