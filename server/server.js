let env = process.env.NODE_ENV || 'development';
console.log(`****** RUNNING IN ${env} MODE ******`);

if (env === 'development' && !process.env.PORT) {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if( env === 'test' && !process.env.PORT) {
	process.env.PORT = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
console.log(`****** SETTING TO PORT ${process.env.PORT} ******`);
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose.js');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');



let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


app.post('/todos', (req, res)=>{
	todo = new Todo({
		text: req.body.text,
	})

	todo.save().then(todo => {
		res.send(todo)
	}).catch(e=>{
		res.status('400').send(e);
	})
});

app.get('/todos', (req, res)=>{
	Todo.find().then(todos => {
		res.status(200).send({todos});
	})
	.catch(e => done(e));
})

//GET /todos/id 
app.get('/todos/:id', (req, res)=> {
	let id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send({error: `ID not valid`});
	}
	Todo.findById(id)
		.then(todo =>{
			if(!todo){
				return res.status(404).send({error: `Todo not found.`});
			}
			res.send({todo});
		}).catch(e => res.status(400).send({e}))
})

app.delete('/todos/:id', (req, res)=>{
	let id = req.params.id;
	
	Todo.findByIdAndRemove(id)
		.then(todo =>{
			if(!todo){
				return res.status(404).send({error: `Todo not found.`});
			}
			res.send({todo});
		}).catch(e => res.status(400).send({e}))

})

app.patch('/todos/:id', (req, res)=> {
	let id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);
	if(!ObjectID.isValid(id)) {
		return res.status(400).send({error: `ID not valid`});
	}

	if(_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
		.then(todo => {
			if(!todo){
				return res.status(404).send();
			}
			res.send({todo});
		})
		.catch(e => res.status(400).send());

});

app.listen(port, ()=>{
	console.log(`****** Spinning up a server on PORT ${port} ******`);
});

module.exports = {app};