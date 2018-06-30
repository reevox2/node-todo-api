const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = "5b36e9f8c8ae813531f6e5b2";

let id = "5b3380536851952d9947ebeb";

if(!ObjectID.isValid(id)) {
		console.log(`ID not valid`)
	}
// Todo.find({
// 	_id: id
// }).then(todos => {
// 	console.log('todos: ', todos)
// }).catch(e => console.log(`${e.value} is an invalid ID.`))

// Todo.findOne({
// 	_id: id
// }).then(todo => {
// 	if(!todo) {
// 		return console.log('No todo found.')
// 	}
// 	console.log('todo: ', todo)
// }).catch(e => console.log(`${e.value} is an invalid ID.`))


// Todo.findById(id).then(todo => {
// 	if(!todo) {
// 		return console.log('No todo found.')
// 	}
// 	console.log('todo by id: ', todo)
// }).catch(e => console.log(`${e.value} is an invalid ID.`))



User.findById(id).then(user=>{
	if(!user){
		return console.log(`User not found.`);
	}
	console.log('User:', `\n`, user);
}).catch(e => console.log(e))