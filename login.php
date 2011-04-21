<?php
$username = $_GET['user'];
$password = $_GET['password'];

$uname = "OH";
$pw = "HELL";
$database="NO";

$con = mysql_connect(localhost, $uname, $pw);

if (!$con)
	{
	die('Could not connect: ' . mysql_error());
	}

mysql_select_db($database);

$query = sprintf("SELECT password FROM users WHERE name = '%s'",$username);
$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$pswrd = $row['password'];
}

if ($password == $pswrd)
{
	header('Location: http://www.edenveilrecords.com/EFH/user.html');
}

else {
	header('Location: http://www.edenveilrecords.com/EFH/login.html');
	echo "Invalid username/password, please try again";
}

?>
