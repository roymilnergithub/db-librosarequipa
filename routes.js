var db = require('./queries');

function http() {
	this.configurar = function(app) {

		/* LIBROS */
		app.post('/nuevo-libro/',function(solicitud, respuesta){
			db.insertarNuevoLibro(solicitud.body, respuesta);
		})

		/* AUTORES */
		app.get('/autores/',function(solicitud, respuesta){
			db.seleccionarAutores(respuesta); 
		})
		app.post('/autor/',function(solicitud, respuesta){
			db.insertarAutor(solicitud.body, respuesta);
		})

		/* EDITORIALES */
		app.get('/editoriales/',function(solicitud, respuesta){
			db.seleccionarEditoriales(respuesta); 
		})
		app.post('/editorial/',function(solicitud, respuesta){
			db.insertarEditorial(solicitud.body, respuesta);
		})

		/* MARCAS */
		// app.post('/marcas/',function(solicitud, respuesta){
		// 	db.insertarMarca(solicitud.body, respuesta); //Esto esta siendo usado
		// })
		// app.get('/marcas/',function(solicitud, respuesta){
		// 	db.seleccionarMarcas(respuesta); //Esto esta siendo usado
		// })
		// app.get('/buscar_marca/:nombreMarca/',function(solicitud, respuesta){
		// 	db.buscarMarcaRepetida(solicitud.params.nombreMarca,respuesta);
		// })
		// app.get('/buscar_abreviatura/:abreviatura/',function(solicitud, respuesta){
		// 	db.buscarAbreviaturaRepetida(solicitud.params.abreviatura,respuesta);
		// })
		// app.delete('/marcas/:id/',function(solicitud, respuesta){
		// 	db.eliminarMarca(solicitud.params.id, respuesta);
		// })
		// app.put('/marcas/',function(solicitud, respuesta){
		// 	db.actualizarMarca(solicitud.body, respuesta);
		// })

		// /* UNIDADES */
		// app.post('/unidades/',function(solicitud, respuesta){
		// 	db.insertarUnidad(solicitud.body, respuesta);
		// })
		// app.get('/unidades/',function(solicitud, respuesta){
		// 	db.seleccionarUnidades(respuesta);
		// })
		// app.get('/buscar_unidad/:nombreUnidad/',function(solicitud, respuesta){
		// 	db.buscarUnidadRepetida(solicitud.params.nombreUnidad,respuesta);
		// })
		// app.get('/buscar_abrev_unid/:abreviatura/',function(solicitud, respuesta){
		// 	db.buscarAbreviaturaUnidadRepetida(solicitud.params.abreviatura,respuesta);
		// })
		// app.delete('/unidades/:id/',function(solicitud, respuesta){
		// 	db.eliminarUnidad(solicitud.params.id, respuesta);
		// })
		// app.put('/unidades/',function(solicitud, respuesta){
		// 	db.actualizarUnidad(solicitud.body, respuesta);
		// })

		// /* LOCALES_COMERCIALES */
		// app.post('/locales/',function(solicitud, respuesta){
		// 	db.insertarLocal(solicitud.body, respuesta); //Esto esta siendo usado
		// })
		// app.get('/locales/',function(solicitud, respuesta){
		// 	db.seleccionarLocales(respuesta); //Esto esta siendo usado
		// })
		// app.get('/buscar_local/:nombreLocal/',function(solicitud, respuesta){
		// 	db.buscarLocalRepetido(solicitud.params.nombreLocal,respuesta);
		// })
		// app.get('/buscar_direccion_local/:direccion/',function(solicitud, respuesta){
		// 	db.buscarDirLocalRepetida(solicitud.params.direccion,respuesta);
		// })
		// app.delete('/locales/:id/',function(solicitud, respuesta){
		// 	db.eliminarLocal(solicitud.params.id, respuesta);
		// })
		// app.put('/locales/',function(solicitud, respuesta){
		// 	db.actualizarLocal(solicitud.body, respuesta);
		// })

		// /* DISTRIBUIDORES */
		// app.post('/distribuidores/',function(solicitud, respuesta){
		// 	db.insertarDistribuidor(solicitud.body, respuesta); //Esto esta siendo usado
		// })
		// app.get('/distribuidores/',function(solicitud, respuesta){
		// 	db.seleccionarDistribuidores(respuesta); //Esto esta siendo usado
		// })
		// app.get('/buscar_nom_distribuidor/:nombreDistribuidor/',function(solicitud, respuesta){
		// 	db.buscarNombreDistribuidorRepetido(solicitud.params.nombreDistribuidor,respuesta);
		// })
		// app.get('/buscar_dir_distribuidor/:direccion/',function(solicitud, respuesta){
		// 	db.buscarDirDistribuidorRepetida(solicitud.params.direccion,respuesta);
		// })
		// app.delete('/distribuidores/:id/',function(solicitud, respuesta){
		// 	db.eliminarDistribuidor(solicitud.params.id, respuesta);
		// })
		// app.put('/distribuidores/',function(solicitud, respuesta){
		// 	db.actualizarDistribuidor(solicitud.body, respuesta);
		// })

		// /* INSUMOS */
		// app.post('/insumos/',function(solicitud, respuesta){
		// 	db.insertarInsumo(solicitud.body, respuesta); 
		// })
		// app.get('/insumos/',function(solicitud, respuesta){
		// 	db.seleccionarInsumos(respuesta); 
		// })
		// app.get('/buscar_registro/:nombre_insumo/:idMarca/',function(solicitud, respuesta){
		// 	db.buscarRegistroRepetido(solicitud.params.nombre_insumo,solicitud.params.idMarca,respuesta);
		// })
		// app.delete('/insumos/:id/',function(solicitud, respuesta){
		// 	db.eliminarInsumo(solicitud.params.id, respuesta);
		// })
		// app.put('/insumos/',function(solicitud, respuesta){
		// 	db.actualizarInsumo(solicitud.body, respuesta);
		// })

		// /* PRODUCTOS */
		// app.post('/productos/',function(solicitud, respuesta){
		// 	db.insertarProducto(solicitud.body, respuesta); 
		// })
		// app.get('/productos/',function(solicitud, respuesta){
		// 	db.seleccionarProductos(respuesta); 
		// })
		// app.get('/buscar_nombre_producto/:nombreProducto/',function(solicitud, respuesta){
		// 	db.buscarNombreProductoRepetido(solicitud.params.nombreProducto,respuesta);
		// })
		// app.delete('/productos/:id/',function(solicitud, respuesta){
		// 	db.eliminarProducto(solicitud.params.id, respuesta);
		// })
		// app.put('/productos/',function(solicitud, respuesta){
		// 	db.actualizarProducto(solicitud.body, respuesta);
		// })

		// /* PRODUCTOS_DISPONIBLES */
		// app.post('/productos_disponibles/',function(solicitud, respuesta){
		// 	db.insertarProductoDisponible(solicitud.body, respuesta); 
		// })
		// app.get('/productos_disponibles/',function(solicitud, respuesta){
		// 	db.seleccionarProductosDisponibles(respuesta); 
		// })
		// app.delete('/productos_disponibles/:id/',function(solicitud, respuesta){
		// 	db.eliminarProductoDisponible(solicitud.params.id, respuesta);
		// })
		// app.put('/productos_disponibles/',function(solicitud, respuesta){
		// 	db.actualizarProductoDisponible(solicitud.body, respuesta);
		// })

		// /* REGISTRO_VENTAS */
		// app.get('/registro_ventas/',function(solicitud, respuesta){
		// 	db.seleccionarRegistroVentas(respuesta); 
		// })

		// /* INGRESO_INSUMOS_ALMACEN */
		// app.post('/ingreso_insumos_almacen/',function(solicitud, respuesta){
		// 	db.insertarIngresoInsumoAlmacen(solicitud.body, respuesta); 
		// })
		// app.get('/ingreso_insumos_almacen/',function(solicitud, respuesta){
		// 	db.seleccionarIngresoInsumosAlmacen(respuesta); 
		// })
		// app.delete('/ingreso_insumos_almacen/:id/',function(solicitud, respuesta){
		// 	db.eliminarIngresoInsumoAlmacen(solicitud.params.id, respuesta);
		// })
		// app.put('/ingreso_insumos_almacen/',function(solicitud, respuesta){
		// 	db.actualizarIngresoInsumoAlmacen(solicitud.body, respuesta);
		// })

		// /* SALIDA_INSUMOS_ALMACEN */
		// app.get('/salida_insumos_almacen/',function(solicitud, respuesta){
		// 	db.seleccionarSalidaInsumosAlmacen(respuesta); 
		// })
		
		/*
		app.get('/unidades/:id',function(solicitud, respuesta){
			db.seleccionarId(solicitud.params.id, respuesta);
		})
		*/
	}
}

module.exports = new http();