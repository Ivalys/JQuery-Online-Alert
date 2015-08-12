<?php
	
	include('core.php');
	
	$switch = "default";
	
	if(isset($_SESSION['password']) && $_SESSION['password'] == true)
	{
		if(isset($_POST['alert']))
		{
			if(in_array($_POST['type'], array('danger', 'warning', 'success', 'default')))
			{
				$dateTime = date('Y-m-d H:i:s');
				mysqli_query($mysqlink, "INSERT INTO joa_alerts VALUES('','".$dateTime."','".$_POST['type']."','".addslashes(utf8_encode($_POST['alert']))."')") or die(mysqli_error($mysqlink));
				$error = "success|Successfully added online alert. It will appear soon for all users (see the main testing page)";
			}
		}
		
		$switch = "loggedIn";
	}
	elseif(isset($_POST['pwd']) && $_POST['pwd'] == $pwd)
	{
		$_SESSION['password'] = true;
		$switch = "loggedIn";
	}
	elseif(isset($_POST['pwd']) && $_POST['pwd'] != $pwd)
	{
		$error = "danger|Wrong password !";
	}
	
?>

<head>
	<title>Testing API - Administration</title>
	<link rel="stylesheet" type="text/css" href="../css/jqueryOA.css">
</head>

<body style="z-index:0;font-family:'Arial';font-size:10px;margin:auto;background-image:linear-gradient(#3366FF, #001DBF);background-image:-moz-linear-gradient(#3366FF, #001DBF);background-image:-webkit-gradient(linear, #3366FF, #001DBF);background-image:-ms-linear-gradient(#3366FF, #001DBF);">
	<table style="margin:auto;width:100%;height:100%;">
		<tr>
			<td style="margin:auto;width:100%;height:100%;text-align:center;">
				<center>
					<h1 style="color:white;">JQuery Online Alert Testing Administration</h1>
					<?php if($switch == "default") { ?>
						<form method="post" action="index.php">
							<input type="password" name="pwd" style="background-color:white;border:1px solid black;color:black;padding:1em;width:600px;" placeholder="Password (see php/core.php)"><br>
							<input type="submit" style="background-color:black;border:1px solid black;color:white;padding:1em;width:600px;" value="Connect">
						</form>
					<?php } else { ?>
						<form method="post" action="index.php">
							<textarea type="text" name="alert" style="background-color:white;border:1px solid black;color:black;padding:1em;width:600px;height:400px;" placeholder="Type your alert here"></textarea><br>
							<select name="type" style="background-color:white;border:1px solid black;color:black;padding:1em;width:600px;">
								<option value="danger" disabled selected>Type of alert</option>
								<option style="background-color:red;color:white;" value="danger">danger</option>
								<option style="background-color:yellow;color:black;" value="warning">warning</option>
								<option style="background-color:green;color:white;" value="success">success</option>
								<option style="background-color:blue;color:white;" value="default">information</option>
							</select><br>
							<input type="submit" style="background-color:black;border:1px solid black;color:white;padding:1em;width:600px;" value="Send online alert">
						</form>
					<?php } ?>
				</center>
			</td>
		</tr>
	</table>
	
	<script type="text/javascript" src="../js/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="../js/jqueryOA.js"></script>
	<script type="text/javascript">
		<?php
			if(isset($error))
			{
				echo "$(document).ready(function() { getOA('".$error."'); });";
			}
		?>
	</script>
</body>