<?php
	
if(isset($_GET['datetime']) && preg_match("#^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}#", $_GET['datetime']))
{
	include('core.php');
	
	$newDate = substr($_GET['datetime'], 0, strlen($_GET['datetime']) -2);
	$seconds = substr($_GET['datetime'], strlen($_GET['datetime']) -2, strlen($_GET['datetime']));
	$seconds -= 5;
	if($seconds < 0)
	{
		// To fix.
		$seconds = "00";
	}
	$finalDate = $newDate."".$seconds;
	$results = mysqli_query($mysqlink, "SELECT * FROM joa_alerts WHERE `timealert` > '".utf8_encode($finalDate)."'") or die(mysqli_error($mysqlink));
	
	if(mysqli_num_rows($results) > 0)
	{
		$return = "";
		while($data = mysqli_fetch_array($results))
		{
			$return = $return."".$data['type']."|".$data['alert'].";;";
		}
		$return = substr($return, 0, strlen($return) - 2);
	}
	
	if(isset($return))
	{
		echo $return;
	}
}
else
{
	echo "danger|An error has occured with JQuery Online Alert at ".$_GET['datetime']." - contact an administrator.";
}

?>