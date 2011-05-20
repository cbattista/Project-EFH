<?php

include "../db.php";

$gid = $_GET['gid'];
$sid = $_GET['sid'];

mysql_connect(localhost, $uname, $password);
mysql_select_db($database);

$query = sprintf("SELECT highScore FROM history WHERE gid = %s AND sid = %s ORDER BY trainingDay ASC", $gid, $sid); 

$result = mysql_query($query);

$highScore = 0;

while ($row = mysql_fetch_assoc($result)) {
	$highScore = $row['highScore'];
}

$output = $highScore; 

echo $output;

?>
