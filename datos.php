<?php
include("conex.php");
$s = $_POST['vall'];	$n = $_POST['nn'];		$d = $_POST['dd'];		$i = $_POST['id'];
$e = $_POST['ed'];		$eli = $_POST['eli'];	$edi = $_POST['edi'];	$reg = $_POST['regs'];
$tabswc = 'tareas';

if($s != '')
{
$sel = mysqli_query($conex,"select * from tareas where no like '%$s%'");
$j = array();
while($fil = mysqli_fetch_array($sel))
{
	$j[] = array(
	'id' => $fil[0],
	'nom' => $fil[1],
	'det' => $fil[2]
	);
}
	$varj = json_encode($j);
	echo $varj;
}

if($reg != '')
{
	$selreg = mysqli_query($conex,"select * from $tabswc where no = '$n'");
	if(mysqli_num_rows($selreg) > 0)
	{	
		echo 'Registro ya existente';
		exit();
	}
	else
	{
		$reg = mysqli_query($conex,"insert into $tabswc values('','$n','$d')");
		if($reg)
		{
			echo 'Tarea registrada';
		}
	}
}

if($eli != '')
{
	$regd = mysqli_query($conex,"delete from $tabswc where id = '$i'");
	if($regd)
	{
		echo 'Registro eliminado';
	}
}

if($edi != '')
{
	$selreg = mysqli_query($conex,"select * from $tabswc where no = '$n' and id != '$i'");
	if(mysqli_num_rows($selreg) > 0)
	{	
		echo 'El Registro ya existe :. coincide le nombre';
		exit();
	}
	else
	{
		$regdd = mysqli_query($conex,"update $tabswc set no = '$n', de = '$d' where id = '$i'");
		if($regdd)
		{
			echo 'Registro actualizado con &eacute;xito en Ibague';
		}
	}
}

if($e != '')
{
	$ee = array();
	$regd = mysqli_query($conex,"select * from $tabswc where id = '$e'");
	$fild = mysqli_fetch_array($regd);
	
	$ee[] = array(
		'id1' => $fild[0],
		'no1' => $fild[1],
		'de1' => $fild[2]
	);
	$elreg = json_encode($ee);
	echo $elreg;	
}
?>