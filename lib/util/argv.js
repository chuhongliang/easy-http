
module.exports = function (argv) {
	let argArr = argv.splice(2);
	let opts = {
		env: 'default',
		title: 'eop-web-server',
		port: 3000,
	};
	argArr.forEach(element => {
		let arg = element.replace('--', '');
		let itemArr = arg.split('=');
		opts[itemArr[0]] = itemArr[1];
	});
	return opts;
}