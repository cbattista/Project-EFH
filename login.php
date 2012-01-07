<?php

include "db.php";

$username = $_GET['user'];
$pass = $_GET['password'];

//If both fields are unempty, continue
if ($username != "" && $pass != ""){

	$con = mysql_connect(localhost, $uname, $password);

	if (!$con){
		die('Could not connect: ' . mysql_error());
		$output = 3;
	}
	
	//If the connection was successfull, then continue
	if ($con){

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
		date_default_timezone_set("America/Toronto");
		$d = getdate();

		$query = sprintf("SELECT lastLogin, consented FROM users WHERE name = '%s'", $username);
		$result = mysql_query($query);
		while($row = mysql_fetch_assoc($result)) {
			$lastLogin = $row['lastLogin'];
			$consented = $row['consented'];
		}

		//record the user's login...
		$update = sprintf("UPDATE users SET lastLogin = '%s-%s-%s %s:%s:%s' WHERE name = '%s'",$d['year'],$d['mon'],$d['mday'],$d['hours'],$d['minutes'],$d['seconds'],$username); 

		mysql_query($update);

		$query = sprintf("SELECT uid FROM users where name = '%s'", $username);
		$result = mysql_query($query);
		while ($row = mysql_fetch_assoc($result)) {
			$uid = $row['uid'];
		}

		//Set cookie to track user login using an hour-long session
		setCookie("funkyTrainUser",$username, time() + 7200, "/");
		setCookie("funkyTrainID", $uid, time() + 7200, "/");

		//if this is their first login or they haven't consented...
		if ($consented == NULL) {
			$output = 2;
		}
	}
	
	//If password given does not match password in database...
	else {
		$output = 0;
	}
    }

}
//If either field is left blank, automatically return false
if($username == "" || $pass == ""){

	$output = 0;
}

echo $output;

?>
