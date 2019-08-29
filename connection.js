const { Client } = require('pg');

function Conexion(){

	this.inicia = function(){
		//const connectionString = process.env.DATABASE_URL || 'postgressql://postgres:1234@localhost:5432/librosarequipa'
		const connectionString = process.env.DATABASE_URL || 'postgressql://bzmntbpbvanybr:3ab0d834a945b22d25ae8866b9ed93b8273111b73eebff54367af04cafa268e8@ec2-54-225-205-79.compute-1.amazonaws.com:5432/deusoa09huk3m7?ssl=true'
		const client = new Client({
		  connectionString: connectionString,
		  ssl: true,
		});
		return client;
		//client.connect();
	}

	// this.pool = client.createPool({
	// 	connectionLimit: 10,
	// 	host: 'ec2-54-225-205-79.compute-1.amazonaws.com',
	// 	user: 'bzmntbpbvanybr',
	// 	password: '3ab0d834a945b22d25ae8866b9ed93b8273111b73eebff54367af04cafa268e8',
	// 	database: 'deusoa09huk3m7'
	// })

	// this.obtener = function(callback) {
	// 	this.pool.getConnection(function(error, connection){
	// 		callback(error, connection);
	// 	})
	// }

}
module.exports = new Conexion();