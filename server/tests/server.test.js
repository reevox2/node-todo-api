const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {dummyTodos, populateTodos, users, populateUsers} = require('./seed/seed');



beforeEach(populateUsers);
beforeEach(populateTodos);

describe('Post /todos', ()=>{
	it('should create a new Todo', done=>{
		let text = 'Test todo text';
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res)=>{
				expect(res.body.text).toBe(text);
			})
			.end((err, res)=>{
				if(err){
					return done(err);
				}

				Todo.find({text}).then(todos => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch(e => done(e));
			})
	})

	it('should not create todo with invalid body data', done => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) return done(err);
				Todo.find().then(todos => {
					expect(todos.length).toBe(2);
					done();
				}).catch(e => done(e));
			});
	});
});

describe('GET /todos', ()=>{
	it('should get all todos', done=>{
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res)=>{
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	})
})


describe('GET /todos/:id', ()=>{
	it('should return todo doc', done => {
		request(app)
			.get(`/todos/${dummyTodos[0]._id}`)
			.expect(200)
			.expect(res=>{
				expect(res.body.todo._id).toBe(dummyTodos[0]._id.toHexString());
			})
			.end(done)
	})
	it('should return 404 not found', done=>{
		request(app)
			.get(`/todos/${new ObjectID}`)
			.expect(404)
			.end(done)
	})
	it('should return 404 for non-object ids', done=>{
		request(app)
			.get(`/todos/123`)
			.expect(404)
			.end(done)
	})
})

describe('DELETE /todos/:id', ()=>{
	it('should delete todo', done => {
		request(app)
			.delete(`/todos/${dummyTodos[0]._id}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(`${dummyTodos[0]._id}`)
			})
			.end(done);
	})
	it('should 400 if todo id is invalid', done => {
		request(app)
			.delete(`/todos/123`)
			.expect(400)
			.end(done);
	})
	it('should 404 if todo not found', done => {
		request(app)
			.delete(`/todos/${new ObjectID}`)
			.expect(404)
			.end(done);
	})
})


describe('PATCH /todos/:id', ()=>{
	it('should update todo, text and completed', done => {
		let id = dummyTodos[0]._id
		let body = {text: 'new text', completed: true}
		request(app)
			.patch(`/todos/${id}`)
			.send(body)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(body.text);
				expect(res.body.todo.completed).toBe(true) 
			})
			.end(done);
	})
	it('should clear completedAt when todo is not completed', done =>{
		let id = dummyTodos[1]._id
		let body = {completed: false}
		request(app)
			.patch(`/todos/${id}`)
			.send(body)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.completedAt).toBe(null);
				expect(res.body.todo.completed).toBe(body.completed) 
			})
			.end(done);
	})
})

describe('GET /users/me', ()=>{
	it('should return a user if authenticated', done => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res)=>{
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
	});
	it('should return a 401 if not authenticated', done => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect(res => {
				expect(res.body).toEqual({})
			})
			.end(done);
	})
})

describe('POST /users', () => {
	it('should create a user', done => {
		let email = 'example@example.com';
		let password = 'abc123yolo';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect(res => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end(err => {
				if(err) return done(err)
				User.findOne({email}).then(user => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				})
			});
	})
	it('should return validation errors if request invalid', done => {
		request(app)
			.post('/users')
			.send({email: 'feafw', password: '1'})
			.expect(400)
			.end(done);
	})
	it('should not create user if email is in use', done => {
		request(app)
			.post('/users')
			.send({email: 'dummy@example.com', password: '123abc123'})
			.expect(400)
			.end((err)=>{
				if(err) return done(err);
				User.find({email: 'dummy@example.com'}).then(users => {
					expect(users.length).toBe(1);
					done();
				})
			});
	})
})