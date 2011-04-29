<?php

include "db.php";

$username = $_GET['user'];
$pass = $_GET['password'];

//If both fields are unempty, continue
if ($username != "" && $pass != ""){
	$con = mysql_connect(localhost, $uname, $password);


	if (!$con){
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db($database);

	$query = sprintf("SELECT password FROM users WHERE name = '%s'",$username);

	$result = mysql_query($query);

	while ($row = mysql_fetch_assoc($result)) {
		$pswrd = $row['password'];
	}
	//If password given matches the password on the server, return true, otherwise return false
	if ($pass == $pswrd){
		$output = 1;
		
		//set timezone and get time for update to users login information	
		date_default_timezone_set("Canada/Eastern");
		$d = getdate();
		$update = sprintf("UPDATE userInfo SET lastLogin = '%s-%s-%s %s:%s:%s' WHERE username = '%s'",$d['year'],$d['mon'],$d['mday'],$d['hours'],$d['minutes'],$d['seconds'],$username); 

		mysql_query($update);

		//Set cookie to track user login
		setcookie("funkyTrainUser",$username, time() + 3600);
	}
	
	//If password given does not match password in database...
	else {
		$output = 0;
	}

}
//If either field is left blank, automatically return false
if($username == "" || $pass == ""){

	$output = 0;
}

echo $output;

?>
