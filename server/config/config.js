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