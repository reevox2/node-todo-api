const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		trim: true
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		},
	}]
})


UserSchema.set('toJSON', {transform: (doc, returned, options) => {
	let userObject = doc.toObject();
	return _.pick(userObject, ['_id', 'email']);
}});

UserSchema.methods.generateAuthToken = function () {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({
		_id: user._id.toHexString(),
		access,
	}, 'abc123').toString();

	user.tokens.push({token, access});

	return user.save().then(()=>{
		return token
	})
};

UserSchema.statics.findByToken = function (token) {
	let User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, 'abc123')
		console.log(decoded);
	} catch(e) {
		return Promise.reject()
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
}


let User = mongoose.model('User', UserSchema);


module.exports = {User}