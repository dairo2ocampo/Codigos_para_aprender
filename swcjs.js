$(document).ready(function(){
	
	$('#tab').hide();
	$('#verreg').hide();
	$('#elim').hide();
	var edit = false;


	/*  I   SEARCH  -  LIST
	HTML
		1. FORM CON BOTON DE BUSCAR
		2. CAPA "C1" OCULTA QUE ALMACENA TABLE CON CABECERAS  Y CAPA "C2" DONDE IRÁ EL RESULTADO EN FILAS
	JS
		1. CAPA OCULTA C1
		2. SCRIPT RECIBE VALOR, [SI NO RECIBE VALOR, C1 OCULTA], SI RECIBE VALOR :   EJECUTA AJAX, RECIBE RESPUESTA DEL PHP, DECODIFICA CON JSON_parse EL RESULTADO, LO GUARDA EN UNA VARIABLE MAQUETADA EN HTML, MUESTRA C1 '.show' Y CREA CONTENIDO PARA MOSTRAR EN C2 '.html'
		VALIDA QUE VENGA VALOR   Y VALIDA SI NO HAY RESULTADOS OCULTAR C1
	PHP
		1. RECIBE PARAMETRO
		2. CONSULTA EN TABLE, GENERA ARREGLO DEL RESULTADO Y LO DECODIFICA CON json_encode
		3. LO IMPRIME CON ECHO, QUE SERÁ EL RESULTADO QUE IRÁ AL JS
	*/
	$('#bscswc').keyup(function(e){
		if($('#bscswc').val())
		{
			let vall = $('#bscswc').val();		/* Nombre campor texto donde coloca el texto a buscar    bscswc */
			$.ajax({
			url: 'datos.php',    				/* url donde se busca   datos.php*/
			type : 'POST',
			data: { vall : vall },
				success: function (resp){
					let res = JSON.parse(resp);				
					let mir = '';
					res.forEach(r => {
						mir += '<tr><td>' + r.id + '</td><td>' + r.nom + '</td><td>' + r.det + '</td></tr>';  
				/* Comos e pintara en html    id, nom y det  son los nombres que vienen de la consulta php que hay en datos.php */
					})
					if(mir != '')
					{
						$('#info').html(mir);		
						$('#tab').show();
					}
					else
					{
						$('#tab').hide();
					}
				}				
			})
		}
		else
		{
			 $('#tab').hide();
		}
	})





	/*	III	INSERT   -   UPDATE
	HTML
		1. CREA FORM REGISTRAR DATOS   -  A FUTURO EL MISMO FORM SIRVE PARA EDITAR		1.
		2. MUESTRA MENSAJE EN CAPA C4 DE REGISTRO CREADO O ACTUALIZADO Y DESAPARECE LA CAJA
	JS
		1. EN UN OBJETO GUARDO LOS DATOS QUE VIENE DEL HTML		2.
		2. RESETEO EL FORM PARA QUE QUEDE VACIO LUEGO DE TENER LOS DATOS EN EL JS		3.	
		3. POST DONDE LLAMO EL PHP QUE REGITRA LOS DATOS Y UN ECHO CON EL MENSAJE QUE MOSTRARA EL JQUERY EN UNA CAPA QUE SE MUESTRA Y SE OCULTA EN n SEGUNDOS.		4.
		4  EJECUTA FUNCION QUE ACTUALIZA EN VIVO EL LISTADO CON EL REGISTRO NUEVO
	PHP
		1. CONSULTA QUE EL REGISTRO NO ESTE REPETIDO
		2. HACER EL INSERT O EDITA EL REGISTRO
		3. CONFIRMA CON UN ECHO LA TAREA REALIZADA O EL MENSAJE DE REGISTRO REPETIDO
	*/
	$('#reg').click(function(e){
		
		e.preventDefault();
		if(edit === true)
		{
			var datos = {
				'id' : $('#i').val(),    	/* n es el ID del campo que trae un valor para registrar*/
				'nn' : $('#n').val(),    	/* n es el NOMBRE del campo que trae un valor para registrar*/
				'dd' : $('#d').val(),		/* d es EL DETALLE del campo que trae un valor para registrar*/
				'edi': 1
			}		
		}
		else
		{
			var datos = {
				'nn' : $('#n').val(),    	/* n es el NOMBRE del campo que trae un valor para registrar*/
				'dd' : $('#d').val(),		/* d es el DETALLE del campo que trae un valor para registrar*/
				'regs' : 1
			}
		}
		$('#t').trigger('reset');
		$.post('datos.php',datos,function(resp1) {
			
			$('#verreg').show();
			$('#verreg2').html(resp1);
			$('#verreg').fadeToggle('slow');
			vermas();		/* llama la funcion vermas para que vaya mostrando los cambios de ediciones, registros y deletes*/
		})
		})





	/*		DELETE LINK
	HTML
		1. LA FUNCIÓN vermas() YA HA CREADO EL LINK DE ELIMINAR		1.
		2. SE CREA UNA CAPA 'C4' DONDE SE MOSTRARA EL MENSAJE QUE SE HA ELIMINADO, YA QUE PROVIENE DEL PHP CUANDO CONFIRMAR EL DELETE
	JS
		1. RECOJE EL VALOR DEL ATRIBUTO DEL LINK QUE ES EL ID DEL REGISTRO LET IDE = $(THIS)[0] 'EL ELEMENTO QUE RECIBE EL LIKK' Y LUEGO BUSCA EL VALOR DEL ATRIBUTO DATEL  -->  LET ID = $(IDE).ATTR('DATEL')
		2. CREA EL AJAX QUE LLAMA EL ARCHIVO PHP QUE ELIMINARA EL REGISTRO
		3. EJECUTA LA FUNCION vermas()   QUE MOSTARARA NUEVAMENTE EL LISTADO ACTUALIZADO
	PHP
		1. RECIBE DEL JS AJAX EL ID Y LA VARIABLE ELI QUE INDICA ELIMINAR, PARA HACER EL DELETE
	*/
	$(document).on('click', '.el', function(e){
		if(confirm('Estra seguro de querer eliminar'))
		{
		e.preventDefault;
		let ide = $(this)[0];
		let id = $(ide).attr('datel');
		const eli = 1;
		$.ajax({
			url: 'datos.php',
			type: 'POST',
			data: {id, eli},
			success: function(respe){
				$('#elim').show();
				$('#elim2').html(respe);
				$('#elim').hide(3000);
				vermas();
			}
		})
		}
	})





	/*		LINK SHOW UPDATE
	HTML
		1. LA FUNCIÓN vermas() YA HA CREADO EL LINK DE EDITAR		1.
	JS
		1. RECOJE EL VALOR DEL ATRIBUTO DEL LINK QUE ES EL ID DEL REGISTRO LET EDE = $(THIS)[0] 'EL ELEMENTO QUE RECIBE EL LIKK' Y LUEGO BUSCA EL VALOR DEL ATRIBUTO DATED  -->  LET ED = $(EDE).ATTR('DATED')
		2. CREA EL AJAX QUE LLAMA EL ARCHIVO PHP QUE CONSULTA CON EL ID EL REGISTRO PARA MOSTRAR EN EL VALUE DE CADA CAMPO PASI ASI PODER EDITAR VALORES DE ESE FORM
		3. LA VARIABLE EDIT LA PONE EN TRUE PARA QUE AL ENVIAR LOS DATOS AL JS SEPA QUE SE EDITARA Y NO SE REGISTRARA
		4. RECOJE LOS DATOS DEL PHP CON JSON_parse() Y LOS PINTA EN CADA CAMPO DEL FORM
		3. CAMBIA EL NOMBRE DEL BOTON ENVIAR POR EDITAR
	PHP
		1. RECIBE DEL JS AJAX EL ID Y DEVUELVE LOS VALORES DE LA CONSULTA A LA TABLA DE ESE ID
	*/
	$(document).on('click', '.ed', function(e){

		e.preventDefault;
		let ede = $(this)[0];
		let ed = $(ede).attr('dated');

		$.ajax({
			url: 'datos.php',
			type: 'POST',
			data: {ed : ed},
			success: function(resped){
				const r = JSON.parse(resped);
				edit = true;
				r.forEach(rr => {
				$('#reg').html('Editar');
				$('#i').val(rr.id1);
				$('#n').val(rr.no1);
				$('#d').val(rr.de1);
				})
			}
		})

	})





	/*	II	REFRESH - RELOAD
	HTML
		1. TABLA CON CABECERA Y CAPA 'C3' DONDE IRAN LOS DATOS QUE EL SISTEMA REFERSCA EN CADA EJECUCIÓN DE INSERT, UPDATE O DELETE
	JS
		1. AJAX QUE LLAMA EL PHP DONDE REALIZA EL SELECT DE LA TABLA
		2. FOREACH PARA ARMAR EL HTML QUE IRÁ EN LA CAPA C3 Y QUE DEBE TENER DOS BOTONES DE EDITAR Y ELIMINAR CON UNA CLASE PARA RECORRERLO Y CADA CLASE TENER UN ATRIBUTO CON EL VALOR DEL ID DEL REGISTRO PARA QUE POR JQUERY SE PUEDA ENVIAR Y HACER EDICIÓN O ELIMINACIÓN.
		3. MAQUETA EN LA CAPA C3 LOS EL HTML DEL FOREACH
	PHP
		1. 
		2. 
		3. 
	*/
	function vermas()
	{
	$.ajax({
			url: 'datos2.php',
			type : 'GET',
				success: function (respl){
					let resl = JSON.parse(respl);
					let mirl = '';
					resl.forEach(l => {
						mirl += '<tr><td><a href="#" class="el" datel="' + l.idd + '">X</a></td><td><a href="#" class="ed" dated="' + l.idd + '">' + l.nod + '</a></td><td>' + l.ded + '</td></tr>';
					})
					$('#infod').html(mirl);
				}				
			})
	}







	//  SIEMPRE SE LLAMA LA FUNCIÓN QUE MUESTRE EL CONTENIDO DE LA CONSULTA 'LISTADO' EN LA CAPA C3
	vermas();
})