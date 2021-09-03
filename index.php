<!DOCTYPE html>
<html lang="es">
	<head>
	<title>TAREAS</title>
	<meta charset="utf-8">
		<!--  BOOTSTRAP MINIFICADO STYLE SANDSTONE   -->
		<link rel="stylesheet" href="https://bootswatch.com/4/sandstone/bootstrap.min.css">
	</head>
<body>

<!--  CAPA IBARRA NAVEGACIÓN SUPERIOR   12 COLUMNAS   -->
<div class="navbar navbar-expand-lg navbar-dar bg-dark">
  <a href="#" class="navbar-brand">INICIO DE LA APLICACI&oacute;N</a>
    <ul class="navbar-nav ml-auto">
	<form class="form-inline my-2 my-lg-1">
	  <input id="bscswc" type="search" class="form-control mr-sm-2" placeholder="Buscar">
<button id="cl" class="btn btn-info my-2" type="submit">Consultar</button>
	</form>
    </ul>	
</div>


<div class="container p-4">
   <div class="row">
   	<!--  CAPA IZQUIERDA FORM REGISTRO Y EDICIÓN   5 COLUMNAS   -->
	<div class="col-md-5">
		<div id="verreg" class="card my-2">
			<div id="verreg2" class="card-body">
			</div>
		</div>		<!-- CAPA MENSAJE CREADO O EDITADO -->

		<div id="elim" class="card my-2">
			<div id="elim2" class="card-body">
			</div>
		</div>		<!-- CAPA MENSAJE ELIMINADO -->

		<div class="card my-2">
		   <div class="card-body">		
			<form id="t" class="">
				<div class="form-group">
				  <input type="hidden" id="i">
				  <input type="text" id="n" class="form-control">
				</div>
				<div class="form-group">
				  <textarea id="d" class="form-control"></textarea>
				</div>
				<button class="btn btn-info btn-block" type="submit" id="reg">Enviar</button>
			</form>
		   </div>
		</div>		<!-- FORM REGISTRO - EDICIÓN -->
    </div>

	<!--  CAPA DERECHA  CONSULTAS Y LISTADO   7 COLUMNAS   -->
    <div class="col-md-7">
		<!-- TABLA DE CONSULTAS DINAMICAS-->	
		<table class="table table-bordered table-sm" id="tab">
	  		<thead>
	    <tr>
		<td>Id</td>
		<td>Nombre</td>
		<td>Detalle</td>
	    </tr>
	  </thead>						<!-- CABECERA TABLA LISTADO DE CONSULTA -->
			<tbody id="info"> </tbody>		<!-- CAPA MUESTRA DATOS DE CONSULTA --> 
		</table>

		<!-- TABLA DE LISTADO-->	
		<table class="table table-bordered table-sm" id="tabd">
			<thead>
			<tr class="bg-danger text-white">
				<td>Eliminar</td>
				<td>Nombrew</td>
				<td>Detallew</td>
			</tr>
		</thead>						<!-- CABECERA TABLA LISTADO -->
	  		<tbody id="infod"> </tbody>		<!-- CAPA DATOS RECARGADOS CON CADA EJECUCIÓN --> 
		</table>
    </div>
   </div>
</div>

<!-- ultima version minificada de jquery      Y      script JS de la aplicación   -->
<script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="   crossorigin="anonymous"></script>
<script src="swcjs.js"></script>
</body>