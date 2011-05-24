<?php

include "../db.php";

$gid = $_GET['gid'];
$day = $_GET['day'];
$sid = $_GET['sid'];

mysql_connect(localhost, $uname, $password);
mysql_select_db($database);

$query = sprintf("INSERT INTO completed VALUES (%s, %s, %s)", $sid, $gid, $day); 

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$output = $row['levels'];
}

echo $output;

?>
