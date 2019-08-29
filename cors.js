function AllowCrossDomain() {
	this.permisos = function(req, res, next) {
		res.header('Access-Control-Allow-Origin','*');
		res.header('Access-Control-Allow-Methods','HEAD, OPTIONS, GET, PUT, POST, DELETE');
		res.header("Access-Control-Allow-Headers", "Pragma, Cache-Control, Origin, X-Requested-With, Content-Type, Accept, Authorization");
		//res.header('Access-Control-Allow-Headers','Content-Type');

		// res.setHeader("Access-Control-Allow-Origin", "*");
		// res.setHeader("Access-Control-Allow-Credentials", "true");
		// res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		// res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		
		next();
		
	}
}

module.exports = new AllowCrossDomain();