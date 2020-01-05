const eop = require('../lib/eop');

const app = eop();


app.listen(3000, function(){
	console.log('lintening at http://127.0.0.1:3000');
});
