const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


let data = {
	id: 10
}

let token = jwt.sign(data, '123abc')
let decoded = jwt.verify(token, '123abc');
console.log(token);
console.log('decoded: ', decoded)

// let msg = 'I am user number 3';

// let hash = SHA256(msg).toString();

// console.log(`Message: ${msg}`);
// console.log(`Hash: ${hash}`);


// let data = {
// 	id: 4
// };


// let token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'some secret').toString(),
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data).toString());


// let resultHash = SHA256(JSON.stringify(token.data) + 'some secret').toString();
// if(resultHash === token.hash){
// 	console.log('data was not changed.')
// } else {
// 	console.log('data was changed dont trust.')
// }