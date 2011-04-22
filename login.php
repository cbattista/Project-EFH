<?php
$username = $_GET['user'];
$password = $_GET['password'];

$uname = "OH";
$pw = "HELL";
$database="NO";

if ($username != "" && $password != ""){

	$con = mysql_connect(localhost, $uname, $pw);


	if (!$con){
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db($database);

	$query = sprintf("SELECT password FROM users WHERE name = '%s'",$username);

	$result = mysql_query($query);

	while ($row = mysql_fetch_assoc($result)) {
		$pswrd = $row['password'];
	}

	if ($password == $pswrd){
		$output = 1;
	}

	else {
		$output = 0;
	}

	echo $output;
}

if($username == "" || $password == ""){

	$output = 0;

	echo $output;
}
?>
