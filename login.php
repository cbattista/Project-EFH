<?php
$username = $_GET['username'];
$password = $_GET['password'];

$uname = "tbattist_execute";
$pw = "frontalcortex";
$database="tbattist_EFH";

mysql_connect(localhost, $uname, $pw);

if (!$con)
	{
	die('Could not connect: Hello' . mysql_error());
	}

mysql_select_db($database);

$result = mysql_query("SELECT name FROM users");

while ($row = mysql_fetch_assoc($result)) {
	$name = $row['name'];
	}
echo $name;

$result = mysql_query("SELECT password FROM users");

while ($row = mysql_fetch_assoc($result)){
	$pswrd = $row['password'];
}
echo $pswrd;

?>
