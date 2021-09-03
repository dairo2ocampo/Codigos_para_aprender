<?php
include("conex.php");

$j2 = array();
$seld = mysqli_query($conex,"select * from tareas order by no");
while($fild = mysqli_fetch_array($seld))
{
	$j2[] = array(
	'idd' => $fild[0],
	'nod' => $fild[1],
	'ded' => $fild[2]
	);
}
	$datj2 = json_encode($j2);
	echo $datj2

?>