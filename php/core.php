<?php
	
session_start();

// -- SQL Part.
$host		= "localhost";
$user		= "root";
$password	= "";
$database	= "jqueryoa";

$mysqlink = mysqli_connect($host, $user, $password, $database);

// -- Conf Part.
$pwd = "nasa";
	
?>