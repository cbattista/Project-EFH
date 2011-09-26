<?php

include "db.php";

$username = $_GET['user'];
$username = $_GET['userid'];


$con = mysql_connect(localhost, $uname, $password);
if (!$con){
	die('Could not connect: ' . mysql_error());
}

mysql_select_db($database);

//set timezone and get time for update to users login information	
date_default_timezone_set("Canada/Eastern");
$d = getdate();

$update = sprintf("UPDATE users SET lastLogin = '%s-%s-%s %s:%s:%s' WHERE name = '%s'",$d['year'],$d['mon'],$d['mday'],$d['hours'],$d['minutes'],$d['seconds'],$username); 

mysql_query($update);

$query = sprintf("SELECT uid FROM users where name = '%s'", $username);

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	echo $uid;
	$uid = $row['uid'];
}

//Set cookie to track user login
setCookie("funkyTrainUser",$username, time() + 3600);
setCookie("funkyTrainID", $uid, time() + 3600);


?>
