// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
	

MongoClient.connect('mongodb://localhost:27017/', (err, client)=>{
	if (err) {
		return console.log('Unable to connect to mongodb server.')
	} 

	console.log('Connected to mongodb server.');
	
	let db = client.db('TodoApp');
	let Todos = db.collection('Todos'), Users = db.collection('Users');

	let bellaCount 
	Users.find({name: 'Bella'}).count().then(count=> {
		bellaCount = count;
	}).catch(err => {
		console.log(err);
	})
	Users.find({name: 'Bella'})
		.toArray()
			.then(list => {
				console.log(`Bella Hunter has captured ${bellaCount} Bella(s): \n`, list);
			})
			.catch(err => {
				console.log(err);
			})




	// Todos.find().count()
	// 	.then(count=>{
	// 		console.log(`Number of Todos: ${count}`);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});



	// Todos.find({
	// 	_id: new ObjectID('5b31f601c58ba4eeead5cd77')
	// }).toArray()
	// 	.then(documents=>{
	// 		console.log('Todos:');
	// 		console.log(documents);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});

	client.close();
});