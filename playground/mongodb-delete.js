// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
	

MongoClient.connect('mongodb://localhost:27017/', (err, client)=>{
	if (err) {
		return console.log('Unable to connect to mongodb server.')
	} 

	console.log('Connected to mongodb server.');
	
	let db = client.db('TodoApp');
	let Todos = db.collection('Todos'), Users = db.collection('Users');

	//deleteMany
	// Todos.deleteMany({text: 'eat lunch'})
	// 	.then(result => {
	// 		console.log(result);
	// 	});

	//deleteOne
	// Todos.deleteOne({text: 'eat lunch'})
	// 	.then(result => {
	// 		console.log(result);
	// 	});

	//findOneAndDelete
	// Todos.findOneAndDelete({text: 'eat lunch'})
	// 	.then(result => {
	// 		console.log(result);
	// 	});

	//delete duplicates and delete wonderbeaver by id
	Users.deleteMany({name: 'Bella'})
		.then(result => {
			console.log(`Deleted ${result.result.n} instance(s) of Bella.`);
		});
	Users.findOneAndDelete({_id: ObjectID('5b31fb08c58ba4eeead5ce5e')})
		.then(user => {
			console.log(`Successfully deleted ${user.value.name}'s tracks...`);
		})
		.catch('Something went wrong in the deletion process.');

	client.close();
});