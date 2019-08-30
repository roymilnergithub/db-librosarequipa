var conexion = require('./connection');
const multiparty = require('multiparty');
const fs = require('fs');
const bufferType = require('buffer-type');

const con = conexion.inicia();
con.connect();

function MetodosDB() {

	// LIBROS
	this.insertarNuevoLibro = function (req, respuesta) {

		const form = new multiparty.Form();
		let dataObject = {};

		form.parse(req, function (err, fields, files) {
			Object.keys(fields).forEach(function (name) {
				dataObject[`${name}`] = fields[name][0];
			});
			Object.keys(files).forEach(function (name) {
				dataObject[`${name}`] = files[name][0];
			});
			
			let imagen = dataObject.imagen;
			dataObject.imagen = '';

			if (imagen.path) {

				const image_ = fs.readFileSync(imagen.path);
				//fs.unlink(imagen.path);
				fs.unlinkSync(imagen.path);
				//productoServicioClass['imagen'] = image_;
				dataObject.imagen = image_;
			  }

			//console.log("hola1 = ", JSON.stringify(dataObject, null, 4));
			con.query(`INSERT into PRODUCTO_SERVICIO 
				(codigo_producto_servicio, titulo, autor_id, isbn, editorial_id, 
				descripcion, cantidad, imagen, precio_original, precio_compra, 
				precio_oferta, estado_producto_servicio) 
				values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
				[
					dataObject.codigo_producto_servicio,
					dataObject.titulo,
					dataObject.autor_id,
					dataObject.isbn,
					dataObject.editorial_id,
					dataObject.descripcion,
					dataObject.cantidad,
					dataObject.imagen,
					dataObject.precio_original,
					dataObject.precio_compra,
					dataObject.precio_oferta,
					'ACT'
				], (error, resultado) => {
					if (error) {
						respuesta.send({ estado: 'Error' });
					} else {
						let imagen = dataObject.imagen;
						if (imagen !== null) {
							let fileType = bufferType(imagen);
							if (fileType) {
							  imagen = 'data:' + fileType.type + ';base64,' + Buffer.from(imagen).toString('base64');
							} else {
							  imagen = 'data:image/jpg' + ';base64,' + Buffer.from(imagen).toString('base64');
							}
						  }

						respuesta.send({ estado: 'OK. Autor insertado exitosamente', imagenBase: imagen });
					}
				})
		});

	}

	this.seleccionarEditorialPluton = function (respuesta) {
		con.query(`SELECT producto_servicio.titulo, autor.nombre, 
						  editorial.nombre, producto_servicio.imagen, 
						  producto_servicio.precio_original, producto_servicio.precio_oferta 
						  FROM producto_servicio
					INNER JOIN autor ON producto_servicio.autor_id = autor.autor_id
					INNER JOIN editorial ON producto_servicio.editorial_id = editorial.editorial_id
						  WHERE producto_servicio.estado_producto_servicio = $1 
							AND autor.estado_autor = $1 AND editorial.estado_editorial = $1 
							AND producto_servicio.editorial_id = $2;`, ['ACT',19],
		(error, res) => {
			if (error) {
				respuesta.send({ estado: 'Error', error: error })
			} else {
				
				for(i=0;i<res.rows.length;i++){
					if (res.rows[i].imagen !== null) {
						let fileType = bufferType(res.rows[i].imagen);
						if (fileType) {
						  res.rows[i].imagen = 'data:' + fileType.type + ';base64,' + Buffer.from(res.rows[i].imagen).toString('base64');
						} else {
						  res.rows[i].imagen = 'data:image/jpg' + ';base64,' + Buffer.from(res.rows[i].imagen).toString('base64');
						}
					  }
				}
				respuesta.send(res.rows);
			}
		});
	}

	/* AUTORES */
	this.seleccionarAutores = function (respuesta) {
		con.query('SELECT autor_id, nombre FROM autor ORDER BY nombre ASC;', (error, res) => {
			if (error) {
				respuesta.send({ estado: 'Error' })
			} else {
				respuesta.send(res.rows);
				// for (let row of res.rows) {
				// 	console.log(JSON.stringify(row));
				// }
			}
			//con.end();
		});
	}

	this.insertarAutor = function (datos, respuesta) {
		con.query('INSERT into AUTOR (nombre, estado_autor) values($1, $2)', [datos.nombre, datos.estado_autor], (error, resultado) => {
			if (error) {
				respuesta.send({ estado: 'Error' });
			} else {
				respuesta.send({ estado: 'OK. Autor insertado exitosamente' });
			}
		})
	}

	/* EDITORIALES */
	this.seleccionarEditoriales = function (respuesta) {

		con.query('SELECT editorial_id, nombre FROM editorial ORDER BY nombre ASC;', (error, res) => {
			if (error) {
				respuesta.send({ estado: 'Error' })
			} else {
				respuesta.send(res.rows);
			}
		});
	}

	this.insertarEditorial = function (datos, respuesta) {
		con.query('INSERT into EDITORIAL (nombre, estado_editorial) values($1, $2)', [datos.nombre, datos.estado_editorial], (error, resultado) => {
			if (error) {
				respuesta.send({ estado: 'Error' });
			} else {
				respuesta.send({ estado: 'OK. Editorial insertada exitosamente' });
			}
		})
	}

	/* MARCAS */

	// this.seleccionarMarcas = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from MARCAS',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// this.buscarMarcaRepetida = function(nombreMarca, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from MARCAS where nombre=?',nombreMarca,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.buscarAbreviaturaRepetida = function(abreviatura, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from MARCAS where abreviatura=?',abreviatura,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// this.eliminarMarca = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from MARCAS where id_marca = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Marca eliminada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.actualizarMarca = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update MARCAS set ? where id_marca = ?', [datos, datos.id_marca], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// /* UNIDADES */

	// this.insertarUnidad = function (datos, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('insert into UNIDADES set ?', datos, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Inserción realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.seleccionarUnidades = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from UNIDADES',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.buscarUnidadRepetida = function(nombreUnidad, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from UNIDADES where nombre=?',nombreUnidad,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.buscarAbreviaturaUnidadRepetida = function(abreviatura, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from UNIDADES where abreviatura=?',abreviatura,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.eliminarUnidad = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from UNIDADES where id_unidad = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Borrar realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }
	// this.actualizarUnidad = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update UNIDADES set ? where id_unidad = ?', [datos, datos.id_unidad], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// /* LOCALES_COMERCIALES */

	// this.insertarLocal = function (datos, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('insert into LOCALES_COMERCIALES set ?', datos, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Inserción de Local realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.seleccionarLocales = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from LOCALES_COMERCIALES',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// this.buscarLocalRepetido = function(nombreLocal, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from LOCALES_COMERCIALES where nombre=?',nombreLocal,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.buscarDirLocalRepetida = function(direccion, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from LOCALES_COMERCIALES where direccion=?',direccion,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.eliminarLocal = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from LOCALES_COMERCIALES where id_local = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Borrar realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.actualizarLocal = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update LOCALES_COMERCIALES set ? where id_local = ?', [datos, datos.id_local], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// /* DISTRIBUIDORES */

	// this.insertarDistribuidor = function (datos, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('insert into DISTRIBUIDORES set ?', datos, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Inserción del Distribuidor realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.seleccionarDistribuidores = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from DISTRIBUIDORES',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// this.buscarNombreDistribuidorRepetido = function(nombreDistribuidor, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from DISTRIBUIDORES where nombre=?',nombreDistribuidor,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.buscarDirDistribuidorRepetida = function(direccion, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from DISTRIBUIDORES where direccion=?',direccion,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.eliminarDistribuidor = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from DISTRIBUIDORES where id_distribuidor = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Distribuidor eliminado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.actualizarDistribuidor = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update DISTRIBUIDORES set ? where id_distribuidor = ?', [datos, datos.id_distribuidor], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// /* INSUMOS */

	// this.insertarInsumo = function (datos, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('insert into INSUMOS set ?', datos, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Inserción del Insumo realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.seleccionarInsumos = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from INSUMOS',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// this.buscarRegistroRepetido = function(nombreInsumo, idMarca, respuesta){
	// 	console.log("nombreInsumo=",nombreInsumo);
	// 	console.log("idMarca=",idMarca);
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from INSUMOS where nombre=? AND id_marca=?',[nombreInsumo,idMarca],function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// this.eliminarInsumo = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from INSUMOS where id_insumo = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Borrar realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.actualizarInsumo = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update INSUMOS set ? where id_insumo = ?', [datos, datos.id_insumo], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// /* PRODUCTOS */

	// this.insertarProducto = function (datos, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('insert into PRODUCTOS set ?', datos, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Inserción realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.seleccionarProductos = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from PRODUCTOS',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.buscarNombreProductoRepetido = function(nombreProducto, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from PRODUCTOS where nombre=?',nombreProducto,function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.eliminarProducto = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from PRODUCTOS where id_producto = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Borrar realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.actualizarProducto = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update PRODUCTOS set ? where id_producto = ?', [datos, datos.id_producto], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// /* PRODUCTOS_DISPONIBLES */

	// this.insertarProductoDisponible = function (datos, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('insert into PRODUCTOS_DISPONIBLES set ?', datos, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Inserción realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.seleccionarProductosDisponibles = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from PRODUCTOS_DISPONIBLES',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }
	// this.eliminarProductoDisponible = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from PRODUCTOS_DISPONIBLES where id_producto_disponible = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Borrar realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }
	// this.actualizarProductoDisponible = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update PRODUCTOS_DISPONIBLES set ? where id_producto_disponible = ?', [datos, datos.id_producto_disponible], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// /* REGISTRO_DE_VENTAS */

	// this.seleccionarRegistroVentas = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		//'select PD.id_producto_disponible as id_prod_disponible, P.nombre as nombre_producto, PD.p_venta as p_venta_pd, PD.fecha_vencimiento as fecha_vencimiento_pd from PRODUCTOS_DISPONIBLES as PD JOIN PRODUCTOS as P where PD.id_producto = P.id_producto'
	// 		cn.query('select * from REGISTRO_DE_VENTAS',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// /* INGRESO_INSUMOS_ALMACEN */

	// this.insertarIngresoInsumoAlmacen = function (datos, respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('insert into INGRESO_INSUMOS_ALMACEN set ?', datos, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Inserción de Ingreso Insumo Almacen realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.seleccionarIngresoInsumosAlmacen = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('select * from INGRESO_INSUMOS_ALMACEN',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	// this.eliminarIngresoInsumoAlmacen = function(id, respuesta) {
	// 	conexion.obtener(function(er, cn) {
	// 		cn.query('delete from INGRESO_INSUMOS_ALMACEN where id_ingreso_insumo = ?', id, function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			}else{
	// 				respuesta.send({ estado: 'OK. Borrar realizado exitosamente'});
	// 			}
	// 		})
	// 	})
	// }

	// this.actualizarIngresoInsumoAlmacen = function (datos, respuesta) {
	// 	conexion.obtener(function(er, cn){
	// 		cn.query('update INGRESO_INSUMOS_ALMACEN set ? where id_ingreso_insumo = ?', [datos, datos.id_ingreso_insumo], function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'});
	// 			} else {
	// 				respuesta.send({ estado: 'OK. Actualizacion realizada exitosamente'});
	// 			}
	// 		})
	// 	})
	// }


	// /* SALIDA_INSUMOS_ALMACEN */

	// this.seleccionarSalidaInsumosAlmacen = function(respuesta){
	// 	conexion.obtener(function(er, cn){
	// 		//'select PD.id_producto_disponible as id_prod_disponible, P.nombre as nombre_producto, PD.p_venta as p_venta_pd, PD.fecha_vencimiento as fecha_vencimiento_pd from PRODUCTOS_DISPONIBLES as PD JOIN PRODUCTOS as P where PD.id_producto = P.id_producto'
	// 		cn.query('select * from SALIDA_INSUMOS_ALMACEN',function(error, resultado){
	// 			cn.release();
	// 			if(error){
	// 				respuesta.send({ estado: 'Error'})
	// 			} else {
	// 				respuesta.send(resultado);
	// 			}

	// 		})
	// 	})
	// }

	/*

	this.seleccionarId = function(id, respuesta){
		conexion.obtener(function(er, cn){
			cn.query('select * from unidades where id=?',id, function(error, resultado){
				cn.release();
				if (error) {
					respuesta.send({ estado: 'Error'});
				} else{
					respuesta.send(resultado);
				}
			})
		})
	}
	*/

}

module.exports = new MetodosDB();