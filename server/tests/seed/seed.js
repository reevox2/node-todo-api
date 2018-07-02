const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');



const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	email: 'dummy@example.com',
	password: 'userOnepass',
	_id: userOneId,
	tokens: [{
		access: 'auth', 
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
}, {
	email: 'dummy2@example.com',
	password: 'userTwopass',
	_id: userTwoId,
}]

const dummyTodos = [{
	text: 'dummy', 
	_id: new ObjectID()
}, {
	text: 'dummy2', 
	_id: new ObjectID(),
	completed: true,
	completedAt: 333
}];


const populateTodos = (done)=> {
	Todo.remove({}).then(()=>{
		return Todo.insertMany(dummyTodos);
	}).then(()=>done()).catch(e => done(e));
}

const populateUsers = (done)=> {
	User.remove({}).then(()=>{
		let userOne = new User(users[0]).save();
		let userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo])
	}).then(()=>done()).catch(e => done(e));
}


module.exports = {dummyTodos, populateTodos, users, populateUsers};