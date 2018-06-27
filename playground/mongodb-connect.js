// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
	

MongoClient.connect('mongodb://localhost:27017/', (err, client)=>{
	if (err) {
		return console.log('Unable to connect to mongodb server.')
	} 

	console.log('Connected to mongodb server.');
	let db = client.db('TodoApp');

	//insert new doc into Users {name, age, location}

	// let Users = db.collection('Users');
	// Users.insertOne({name: 'Bella', age: 31, location: 'Samgakji'},(error, result)=>{
	// 	if (err) {
	// 		return console.log('Unable to insert new user.')
	// 	}
	// 	console.log(result.ops);
	// })


	
	// let Todos = db.collection('Todos');
	// Todos.insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// },(err, result)=>{
	// 	if (err){
	// 		return console.log('Unable to insert todo.', err)
	// 	}
	// 	console.log(result.ops);
	// })

	client.close();
});