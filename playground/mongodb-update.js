// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
	

MongoClient.connect('mongodb://localhost:27017/', (err, client)=>{
	if (err) {
		return console.log('Unable to connect to mongodb server.')
	} 

	console.log('Connected to mongodb server.');
	
	let db = client.db('TodoApp');
	let Todos = db.collection('Todos'), Users = db.collection('Users');

	//findOneAndUpdate
	// Todos.findOneAndUpdate({_id: ObjectID("5b31f601c58ba4eeead5cd77")}, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false,
	// }).then(result=>{
	// 	console.log(result);
	// })

	Users.findOneAndUpdate({_id: ObjectID('5b31faf5c58ba4eeead5ce5c')},{
		$set: {
			name: 'Bella'
		},
		$inc: {age: 6}
	},{returnOriginal: false})
		.then(updatedUser => {
			console.log(updatedUser);
		})
		.catch(err=>{
			if(err){
				console.log(err);
			}
		})

	client.close();
});