const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(result => {
// 	console.log(result);
// }).catch(e => {
// 	if(e) console.error(e)
// })


Todo.findOneAndRemove({}).then(result => {
	console.log(result);
})

// Todo.findByIdAndRemove('5b3838a887e6483bd57f4a80').then(result => {
// 	console.log(result);
// }).catch(e => {
// 	if(e) console.error(e)
// })