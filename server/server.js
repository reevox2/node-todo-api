const {mongoose} = require('./db/mongoose.js');
let {Todo} = require('./models/todo');
let {User} = require('./models/User');


const express = require('express');
const bodyParser = require('body-parser');

let app = express();

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

app.listen(3000, ()=>{
	console.log(`Started on port 3000`)
});

module.exports = {app};