const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose.js');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');


const express = require('express');
const bodyParser = require('body-parser');

let app = express();
const port = process.env.PORT || 3000;

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
	if(!ObjectID.isValid(id)) {
		return res.status(400).send({error: `ID not valid`});
	}
	Todo.findByIdAndRemove(id)
		.then(todo =>{
			if(!todo){
				return res.status(404).send({error: `Todo not found.`});
			}
			res.send({todo});
		}).catch(e => res.status(400).send({e}))

})

app.listen(port, ()=>{
	console.log(`Spinning up a server on ${port}`);
});

module.exports = {app};