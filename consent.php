<?php

include "db.php";

$name = $_GET['name'];
$username = $_COOKIE["funkyTrainUser"];
$uid = $_COOKIE["funkyTrainID"];

$con = mysql_connect(localhost, $uname, $password);
if (!$con){
	die('Could not connect: ' . mysql_error());
}

mysql_select_db($database);

$update = sprintf("UPDATE users SET consented = '%s' WHERE uid = %s", $name, $uid); 

mysql_query($update);

?>
