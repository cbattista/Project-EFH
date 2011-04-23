<?php
$username = $_GET['user'];
$password = $_GET['password'];

$uname = "OH";
$pw = "HELL";
$database="NO";

//Set cookie to track user login
setcookie($username,'EFH', time()+3600);

//If both fields are unempty, continue
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
	//If password given matches the password on the server, return true, otherwise return false
	if ($password == $pswrd){
		$output = 1;
		
		//set timezone and get time for update to users login information	
		date_default_timezone_set("Canada/Eastern");
		$d = getdate();
		$update = sprintf("UPDATE userInfo SET lastLogin = '%s-%s-%s %s:%s:%s' WHERE username = '%s'",$d['year'],$d['mon'],$d['mday'],$d['hours'],$d['minutes'],$d['seconds'],$username); 

		mysql_query($update);
	}

	else {
		$output = 0;
	}

	echo $output;
}
//If either field is left blank, automatically return false
if($username == "" || $password == ""){

	$output = 0;

	echo $output;
}


?>
